import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TransactionsComponent } from "./transactions.component";
import { TransactionDetailComponent } from "./transaction-detail/transaction-detail.component";
import { TransactionDetailResolver } from "./transaction-detail/transaction-detail.resolver";

const routes: Routes = [
	{ path: "default", component: TransactionsComponent },
	{
		path: "default/:id",
		component: TransactionDetailComponent,
		resolve: {
			transaction: TransactionDetailResolver
		}
	}
];

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
	exports: [NativeScriptRouterModule],
	providers: [TransactionDetailResolver]
})
export class TransactionsRoutingModule { }
