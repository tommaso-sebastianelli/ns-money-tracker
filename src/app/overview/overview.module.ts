import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

import { OverviewRoutingModule } from "./overview-routing.module";
import { OverviewComponent } from "./overview.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        OverviewRoutingModule,
        NativeScriptCommonModule,
        NativeScriptUIChartModule,
        SharedModule
    ],
    declarations: [
        OverviewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OverviewModule { }
