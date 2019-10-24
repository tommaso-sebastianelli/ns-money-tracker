import { Component, OnInit } from "@angular/core";
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
    constructor(private _itemService: DataService, public calendarService: CalendarService) {
        this.tabSelectedIndex = 1;
    }

    ngOnInit(): void {
        this.items = this._itemService.getAll();
    }

    onLoaded(args) {
        this.tabSelectedIndex = 1;
    }


    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        if (args.newIndex === 1) {
            return;
        }
        if (args.newIndex === 1 && args.oldIndex === 2) {
            return;
        }
        if (args.newIndex === 1 && args.oldIndex === 0) {
            return;
        }

        if (args.newIndex > args.oldIndex) {
            alert(args.oldIndex + " " + args.newIndex);
            setTimeout(() => {
                this.calendarService.nextSnapshot();
                this.tabSelectedIndex--;
            }, 1000);
        } else if (args.newIndex < args.oldIndex) {
            alert(args.oldIndex + " " + args.newIndex);
            setTimeout(() => {
                this.calendarService.previousSnapshot();
                this.tabSelectedIndex++;
            }, 1000);
        }
    }


}
