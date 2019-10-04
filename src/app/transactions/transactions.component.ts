import { Component, OnInit } from "@angular/core";
import { DataService, IDataItem } from "../shared/data.service";

@Component({
    selector: "Transactions",
    templateUrl: "./transactions.component.html"
})
export class TransactionsComponent implements OnInit {
    items: Array<IDataItem>;

    constructor(private _itemService: DataService) { }

    ngOnInit(): void {
        this.items = this._itemService.getItems();
    }
}
