import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TransactionsRoutingModule } from "./transactions-routing.module";
import { TransactionsComponent } from "./transactions.component";
import { TransactionDetailComponent } from "./transaction-detail/transaction-detail.component";

import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
		TransactionsRoutingModule, 
		NativeScriptCommonModule,
		NativeScriptUIDataFormModule,
		SharedModule
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
