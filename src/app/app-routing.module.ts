import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(transactionsTab:transactions/default//overviewTab:overview/default//searchTab:search/default)",
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
        path: "search",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule),
        outlet: "searchTab"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
