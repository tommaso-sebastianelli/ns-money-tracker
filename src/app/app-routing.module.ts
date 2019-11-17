import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { TransactionDetailComponent } from "./transactions/transaction-detail/transaction-detail.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(transactionsTab:transactions/default//overviewTab:overview/default//walletsTab:wallets/default)",
        pathMatch: "full"
    },

    {
        path: "transactions",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/transactions/transactions.module").then((m) => m.TransactionsModule),
        outlet: "transactionsTab"
    },
    {
        path: "overview",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/overview/overview.module").then((m) => m.OverviewModule),
        outlet: "overviewTab"
    },
    {
        path: "wallets",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/wallets/wallets.module").then((m) => m.WalletsModule),
        outlet: "walletsTab"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
