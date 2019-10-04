import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { TransactionsComponent } from "./transactions.component";
import { ItemDetailComponent } from "./item-detail/item-detail.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TransactionsRoutingModule
    ],
    declarations: [
        TransactionsComponent,
        ItemDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TransactionsModule { }
