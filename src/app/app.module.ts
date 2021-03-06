import { NgModule, NO_ERRORS_SCHEMA, InjectionToken } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IDataProvider } from "./core/data-provider";
import { DataServiceMock } from "./core/data-mock.service";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

export const dataProvider = new InjectionToken<IDataProvider>("dataProviderInjectionToken");

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
		NativeScriptModule,
		NativeScriptAnimationsModule,
		AppRoutingModule,
		CoreModule
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
