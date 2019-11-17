import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TransactionsRoutingModule } from "./transactions-routing.module";
import { TransactionsComponent } from "./transactions.component";
import { TransactionDetailComponent } from "./transaction-detail/transaction-detail.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TransactionsRoutingModule
    ],
    declarations: [
        TransactionsComponent,
        TransactionDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TransactionsModule { }
