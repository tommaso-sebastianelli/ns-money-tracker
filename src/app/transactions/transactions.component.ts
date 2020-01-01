import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Inject } from "@angular/core";
import { ICalendarSnapshot } from "../core/calendar.service";
import { Observable, of } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { ITransaction } from "../core/models/transaction";
import { ICategory } from "../core/models/category";
import { dataProvider } from "../app.module";
import { IDataProvider } from "../core/data-provider";
import { ANIMATIONS } from "../shared/animations";
import { Page, View } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";

@Component({
	selector: "Transactions",
	templateUrl: "./transactions.component.html",
	styleUrls: ["./transactions.component.scss"],
	animations: ANIMATIONS
})
export class TransactionsComponent implements OnInit {
	@ViewChild("prev", { static: true }) prev: ElementRef;
	@ViewChild("now", { static: true }) now: ElementRef;
	@ViewChild("next", { static: true }) next: ElementRef;

	transactions: Observable<Array<ITransaction>>;

	public fabPop = false;

	constructor(
		@Inject(dataProvider) private data: IDataProvider,
		public cd: ChangeDetectorRef,
		public page: Page,
		private routerExtensions: RouterExtensions
	) { }

	public ngOnInit(): void {
		this.page.on('navigatingTo', (data) => {
			this.fabPop = true;
			this.cd.detectChanges();
		});

		this.page.on('navigatingFrom', (data) => {
			this.fabPop = false;
			this.cd.detectChanges();
		})
	}

	public getIconPath(t: ITransaction): Observable<string> {
		return this.data.getCategory(t.categoryId)
			.pipe(
				mergeMap(c => of(`~/app/images/${c.icon}.png`))
			)
	}

	public getColor(t: ITransaction): Observable<string> {
		return this.data.getCategory(t.categoryId).pipe(
			//filter((c: ICategory) => c && !!c.color),
			map((c: ICategory) => c.color)
		);
	}

	public getCategoryName(t: ITransaction): Observable<string> {
		return this.data.getCategory(t.categoryId).pipe(
			map(c => c.name)
		)
	}

	public update(snapshot: ICalendarSnapshot) {
		console.log(`timelineChange`);
		this.loadTransactions(snapshot)
			.subscribe()
	}

	public select(id: number) {
		setTimeout(() => {
			this.routerExtensions.navigate(['/', { outlets: { transactionsTab: ['transactions', 'default', id] } }]).then(() => { console.log('navigation') })
		}, 200)
	}

	// disable vertical srolling while user swipes the timeline, which caused buggy animations
	public onPan(args: PanGestureEventData) {
		const disable = (args.state === 2) ? true : false;
		console.log(`listview scrolling ${(disable ? 'enabled' : 'disabled')}`);
		(<View>args.object).nativeView.requestDisallowInterceptTouchEvent(disable);
	}

	private loadTransactions(snapshot: ICalendarSnapshot): Observable<any> {
		this.transactions = this.data.getAllTransactions(
			snapshot.now.valueOf(),
			snapshot.next.valueOf())

		// return this.transactions;
		return of(true);
	}

}
