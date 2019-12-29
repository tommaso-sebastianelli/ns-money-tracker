import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { OverviewRoutingModule } from "./overview-routing.module";
import { OverviewComponent } from "./overview.component";

@NgModule({
    imports: [
        OverviewRoutingModule,
        NativeScriptCommonModule
    ],
    declarations: [
        OverviewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OverviewModule { }
