import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { registerElement } from 'nativescript-angular/element-registry';
registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

@NgModule({
	imports: [
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class CoreModule { }
