import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Inject, AfterViewInit } from "@angular/core";
import { CalendarService } from "../core/calendar.service";
import { Observable,  of } from "rxjs";
import { map,  mergeMap } from "rxjs/operators";
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

	

	getIconPath(t: ITransaction): Observable<string> {
		return this.data.getCategory(t.categoryId)
			.pipe(
				mergeMap(c => of(`~/app/images/${c.icon}.png`))
			)
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

}
