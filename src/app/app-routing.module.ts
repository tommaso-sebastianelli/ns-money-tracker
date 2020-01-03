import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NSEmptyOutletComponent } from "nativescript-angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    {
        path: "",
        redirectTo: "/(transactionsTab:transactions/default//overviewTab:overview/default//settingsTab:settings/default)",
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
        path: "settings",
        component: NSEmptyOutletComponent,
        loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule),
        outlet: "settingsTab"
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
