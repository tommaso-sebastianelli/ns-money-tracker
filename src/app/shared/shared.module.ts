import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgRippleModule } from 'nativescript-ng-ripple';
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
	imports: [
		NativeScriptCommonModule,
		NgRippleModule
	],
	exports: [
		TimelineComponent,
		NgRippleModule
	],
	declarations: [TimelineComponent],
	providers: []
})
export class SharedModule { }
