import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DataServiceMock } from "../../shared/data-mock.service";
import { Observable } from "rxjs";
import { ITransaction } from "~/app/shared/transaction";

@Component({
    selector: "ItemDetail",
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: Observable<ITransaction>;

    constructor(
        private _data: DataServiceMock,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        const id = +this._route.snapshot.params.id;
        this.item = this._data.getTransaction(id);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}
