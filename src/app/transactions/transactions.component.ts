import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from "@angular/core";
import { DataService, ITransaction } from "../shared/data.service";
import { CalendarService } from "../shared/calendar.service";
import { Observable } from "rxjs";
import { SwipeGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { View } from "tns-core-modules/ui/core/view/view";

@Component({
    selector: "Transactions",
    templateUrl: "./transactions.component.html",
    styleUrls: ["./transactions.component.css"]
})
export class TransactionsComponent implements OnInit {
    @ViewChild("prev", { static: true }) prev: ElementRef;
    @ViewChild("now", { static: true }) now: ElementRef;
    @ViewChild("next", { static: true }) next: ElementRef;
    transactions: Observable<Array<ITransaction>>;

    constructor(private _itemService: DataService,
        // tslint:disable-next-line: align
        public calendarService: CalendarService,
        // tslint:disable-next-line: align
        protected cd: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.loadTransactions();
    }

    onSwipe(args: SwipeGestureEventData) {
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Swipe Direction: " + args.direction);

        let slideTransalateX;
        // backward slide
        if (args.direction === 2) {
            slideTransalateX = -1;
            this.calendarService.nextSnapshot();
        } else {
            slideTransalateX = 1;
            this.calendarService.previousSnapshot();
        }

        (<View>this.prev.nativeElement).animate({ translate: { x: slideTransalateX * 200, y: 0 }, opacity: 0 });
        (<View>this.now.nativeElement).animate({ translate: { x: slideTransalateX * 200, y: 0 }, opacity: 1 });
        (<View>this.next.nativeElement).animate({ translate: { x: slideTransalateX * 200, y: 0 }, opacity: 0 });
        (<View>args.object).animate({ translate: { x: slideTransalateX * 500, y: 0 }, opacity: 0 });
        setTimeout(() => {
            this.loadTransactions();
            (<View>this.prev.nativeElement).resetNativeView();
            (<View>this.prev.nativeElement).initNativeView();
            (<View>this.now.nativeElement).resetNativeView();
            (<View>this.now.nativeElement).initNativeView();
            (<View>this.next.nativeElement).resetNativeView();
            (<View>this.next.nativeElement).initNativeView();
            (<View>args.object).resetNativeView();
            (<View>args.object).initNativeView();
        }, 200);

    }

    private loadTransactions(): void {
        this.transactions = this._itemService.getAll(
            this.calendarService.snapshot.now.valueOf(),
            this.calendarService.snapshot.next.valueOf());
    }

}
