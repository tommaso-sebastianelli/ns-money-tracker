import { NgModule, NO_ERRORS_SCHEMA, InjectionToken } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IDataProvider } from "./shared/data-provider";
import { DataServiceMock } from "./shared/data-mock.service";

export const dataProvider = new InjectionToken<IDataProvider>("dataProviderInjectionToken");

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        {
            provide: dataProvider,
            useClass: DataServiceMock
        }
    ]
})
export class AppModule { }
