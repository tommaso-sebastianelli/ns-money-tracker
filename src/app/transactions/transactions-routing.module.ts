import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TransactionsComponent } from "./transactions.component";
import { TransactionDetailComponent } from "./transaction-detail/transaction-detail.component";
import { TransactionDetailResolver } from "../core/resolvers/transaction.resolver";
import { CategoriesResolver } from "../core/resolvers/categories.resolver";

const routes: Routes = [
	{ path: "default", component: TransactionsComponent },
	{
		path: "default/:id",
		component: TransactionDetailComponent,
		resolve: {
			transaction: TransactionDetailResolver,
			categories: CategoriesResolver
		}
	}
];

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
	exports: [NativeScriptRouterModule],
	providers: []
})
export class TransactionsRoutingModule { }
