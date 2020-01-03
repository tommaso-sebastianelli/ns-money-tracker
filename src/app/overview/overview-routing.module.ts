import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { OverviewComponent } from "./overview.component";
import { CategoriesResolver } from "../core/resolvers/categories.resolver";

const routes: Routes = [
    {
        path: "default",
        component: OverviewComponent,
        resolve: {
            categories: CategoriesResolver
        }
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OverviewRoutingModule { }
