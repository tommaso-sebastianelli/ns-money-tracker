import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { WalletsRoutingModule } from "./wallets-routing.module";
import { WalletsComponent } from "./wallets.component";

@NgModule({
    imports: [
        WalletsRoutingModule,
        NativeScriptCommonModule
    ],
    declarations: [
        WalletsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WalletsModule { }
