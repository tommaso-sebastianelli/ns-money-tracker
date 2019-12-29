import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TimelineComponent } from './timeline/timeline.component';

@NgModule({
	imports: [
		NativeScriptCommonModule
	],
	exports: [
		TimelineComponent
	],
	declarations: [TimelineComponent],
	providers: []
})
export class SharedModule { }
