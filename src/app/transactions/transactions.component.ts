import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { DataService, ITransaction } from "../shared/data.service";
import { CalendarService } from "../shared/calendar.service";
import { Observable } from "rxjs";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view/tab-view";

@Component({
    selector: "Transactions",
    templateUrl: "./transactions.component.html",
    styleUrls: ["./transactions.component.css"]
})
export class TransactionsComponent implements OnInit {
    items: Observable<Array<ITransaction>>;
    tabSelectedIndex: number;
    tabView: TabView;
    constructor(private _itemService: DataService,
        // tslint:disable-next-line: align
        public calendarService: CalendarService,
        // tslint:disable-next-line: align
        protected cd: ChangeDetectorRef) {
        this.tabSelectedIndex = 1;
    }

    ngOnInit(): void {
        this.items = this._itemService.getAll();
    }

    onLoaded(args) {
        this.tabSelectedIndex = -1;
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        this.cd.detach();
        this.tabSelectedIndex = -1;
        this.cd.detectChanges();

        setTimeout(() => {
            if (args.newIndex === 0) {
                this.calendarService.previousSnapshot();
                // tslint:disable-next-line: align
            } if (args.newIndex === 2) {
                this.calendarService.nextSnapshot();
            }
            this.tabSelectedIndex = 1;
            this.cd.detectChanges();

        }, 100);
    }

}
