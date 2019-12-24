import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Inject, AfterViewInit } from "@angular/core";
import { CalendarService } from "../core/calendar.service";
import { Observable, from, concat, forkJoin, of } from "rxjs";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { View } from "tns-core-modules/ui/core/view/view";
import { AnimationPromise } from "tns-core-modules/ui/animation/animation";
import { map, concatMap, mergeAll, mergeMap, delay, tap } from "rxjs/operators";
import { ITransaction } from "../core/models/transaction";
import { ICategory } from "../core/models/category";
import { dataProvider } from "../app.module";
import { IDataProvider } from "../core/data-provider";
import { ANIMATIONS } from "../shared/animations";
import { Page } from "tns-core-modules/ui/page/page";
import { Router } from "@angular/router";

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

	constructor(@Inject(dataProvider) private data: IDataProvider,
		// tslint:disable-next-line: align
		public calendarService: CalendarService,
		// tslint:disable-next-line: align
		public cd: ChangeDetectorRef,
		public page: Page,
		public router: Router
	) { }

	ngOnInit(): void {
		this.loadTransactions();
		this.page.on('navigatingTo', (data) => {
			this.fabPop = true;
			this.loadTransactions().subscribe(
				() => {
					this.cd.detectChanges();
				}
			);
		});

		this.page.on('navigatingFrom', (data) => {
			this.fabPop = false;
			this.cd.detectChanges();
		})
	}

	onSwipe(args: SwipeGestureEventData) {
		console.log("Object that triggered the event: " + args.object);
		console.log("View that triggered the event: " + args.view);
		console.log("Event name: " + args.eventName);
		console.log("Swipe Direction: " + args.direction);

		let slideTranslateX;
		// backward slide
		if (args.direction === 2) {
			slideTranslateX = -1;
			this.calendarService.nextSnapshot();
		} else {
			slideTranslateX = 1;
			this.calendarService.previousSnapshot();
		}

		console.log('load animations...');
		this.loadAnimations(slideTranslateX, args)
			.pipe(
				mergeMap(() => {
					console.log('loading transactions...');
					return this.loadTransactions()
				}),
				mergeMap(() => {
					console.log('transactions loaded, resetting views...');
					return this.resetAnimations(args)
				})
			).subscribe(
				ok => console.log('ok'),
				err => console.error(err),
				() => console.log('complete')
			);
	}

	getLabel(t: ITransaction): Observable<string> {
		return this.data.getCategory(t.categoryId).pipe(
			//filter((c: ICategory) => c && !!c.description),
			map((c: ICategory) => c.name.charAt(0))
		);
	}

	getColor(t: ITransaction): Observable<string> {
		return this.data.getCategory(t.categoryId).pipe(
			//filter((c: ICategory) => c && !!c.color),
			map((c: ICategory) => c.color)
		);
	}

	getCategoryName(t: ITransaction): Observable<string> {
		return this.data.getCategory(t.categoryId).pipe(
			map(c => c.name)
		)
	}

	private loadTransactions(): Observable<any> {
		this.transactions = this.data.getAllTransactions(
			this.calendarService.snapshot.now.valueOf(),
			this.calendarService.snapshot.next.valueOf());

		// return this.transactions;
		return of(true);
	}

	private loadAnimations(directionIndex: number, args): Observable<any> {
		return forkJoin([
			(<View>this.prev.nativeElement).animate({ translate: { x: directionIndex * 200, y: 0 }, opacity: 0 }),
			(<View>this.now.nativeElement).animate({ translate: { x: directionIndex * 200, y: 0 }, opacity: 1 }),
			(<View>this.next.nativeElement).animate({ translate: { x: directionIndex * 200, y: 0 }, opacity: 0 }),
			(<View>args.object).animate({ translate: { x: directionIndex * 500, y: 0 }, opacity: 0, })
		]
		)
	}

	private resetAnimations(args): Observable<null> {
		return Observable.create(subscriber => {
			const resetConf = { translate: { x: 0, y: 0 }, opacity: 1, duration: 0 };
			(<View>this.prev.nativeElement).animate(resetConf),
				(<View>this.now.nativeElement).animate(resetConf),
				(<View>this.next.nativeElement).animate(resetConf),
				(<View>args.object).animate(resetConf)
			subscriber.next(null);
		});
	}

}
