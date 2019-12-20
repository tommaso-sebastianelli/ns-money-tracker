import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild, Inject } from "@angular/core";
import { CalendarService } from "../core/calendar.service";
import { Observable, from, of } from "rxjs";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { View, resetNativeView } from "tns-core-modules/ui/core/view/view";
import { AnimationPromise } from "tns-core-modules/ui/animation/animation";
import { catchError, tap, map, mergeMap, delay } from "rxjs/operators";
import { ITransaction } from "../models/transaction";
import { ICategory } from "../models/category";
import { dataProvider } from "../app.module";
import { IDataProvider } from "../core/data-provider";

@Component({
	selector: "Transactions",
	templateUrl: "./transactions.component.html",
	styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
	@ViewChild("prev", { static: true }) prev: ElementRef;
	@ViewChild("now", { static: true }) now: ElementRef;
	@ViewChild("next", { static: true }) next: ElementRef;
	transactions: Observable<Array<ITransaction>>;

	constructor(@Inject(dataProvider) private data: IDataProvider,
		// tslint:disable-next-line: align
		public calendarService: CalendarService,
		// tslint:disable-next-line: align
		protected cd: ChangeDetectorRef) {
	}

	ngOnInit(): void {
		this.loadTransactions();
		console.log("a");
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

		this.loadTransactions()
			.pipe(
				mergeMap(() => this.loadAnimations(slideTranslateX, args)),
				mergeMap(() => this.resetAnimations(args))
			)
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

	private loadTransactions(): Observable<Array<ITransaction>> {
		this.transactions = this.data.getAllTransactions(
			this.calendarService.snapshot.now.valueOf(),
			this.calendarService.snapshot.next.valueOf());

		return this.transactions;
	}

	private loadAnimations(directionIndex: number, args): Observable<Array<AnimationPromise>>{
		return of([
			// (<View>this.prev.nativeElement).animate({ translate: { x: slideTransalateX * 200, y: 0 }, opacity: 0 }),
			// (<View>this.now.nativeElement).animate({ translate: { x: slideTransalateX * 200, y: 0 }, opacity: 1 }),
			// (<View>this.next.nativeElement).animate({ translate: { x: slideTransalateX * 200, y: 0 }, opacity: 0 }),
			(<View>args.object).animate({ translate: { x: directionIndex * 500, y: 0 }, opacity: 0 })
		])
	}

	private resetAnimations(args): Observable<null> {
		return Observable.create(subscriber => {
			(<View>this.prev.nativeElement).resetNativeView();
			(<View>this.prev.nativeElement).initNativeView();
			(<View>this.now.nativeElement).resetNativeView();
			(<View>this.now.nativeElement).initNativeView();
			(<View>this.next.nativeElement).resetNativeView();
			(<View>this.next.nativeElement).initNativeView();
			(<View>args.object).resetNativeView();
			(<View>args.object).initNativeView();
			subscriber.next(null);
		});
	}

}
