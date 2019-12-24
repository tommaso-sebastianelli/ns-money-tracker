import { Component, OnInit, Inject, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from '~/app/models/transaction';
import { ICategory } from '~/app/models/category';
import { dataProvider } from '~/app/app.module';
import { IDataProvider } from '~/app/core/data-provider';
import { PropertyConverter } from 'nativescript-ui-dataform';
import { Page } from 'tns-core-modules/ui/page/page';
import { ANIMATIONS } from '~/app/shared/animations';
import { Frame } from 'tns-core-modules/ui/frame/frame';

class CategoryConverter implements PropertyConverter {
	categories: Array<ICategory>;
	constructor(c: Array<ICategory>) {
		this.categories = c;
	}
	convertFrom(id: number) {
		return this.categories.find((c: ICategory) => c.id === id).name;
	}
	convertTo(name: string) {
		return this.categories.find((c: ICategory) => c.name === name).id;
	}
}

class DateConverter implements PropertyConverter {
	convertFrom(timestamp: number) {
		const date = timestamp ? new Date(timestamp) : null;
		const result = date === null ? null : date.toJSON();
		return result;
	}

	convertTo(dateString: string) {
		const date = new Date(dateString);
		const result = date ? date.getTime() : 0;
		return result;
	}
}


@Component({
	selector: 'ns-transaction-detail',
	templateUrl: './transaction-detail.component.html',
	styleUrls: ['./transaction-detail.component.scss'],
	animations: ANIMATIONS
})
export class TransactionDetailComponent implements OnInit, AfterViewInit {

	public transaction: ITransaction;
	public categories: Array<ICategory>;
	public metadata: any;
	public categoryConverter;
	public dateConverter;
	public fabPop = false;

	constructor(
		private route: ActivatedRoute,
		public frame: Frame,
		@Inject(dataProvider) private data: IDataProvider,
		protected cd: ChangeDetectorRef,
		private page: Page
	) {

	}

	ngOnInit() {
		const data = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.transaction;
		this.categories = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.categories;
		if (data) {
			this.transaction = { ...data };
		} else {
			this.transaction = <ITransaction>{
				id: null,
				amount: 0.0,
				categoryId: 1,
				datetime: new Date().valueOf(),
				wallet: 1,
				notes: ""
			}
		}
		console.log("transaction-detail.component - transaction: " + JSON.stringify(this.transaction));

		this.categoryConverter = new CategoryConverter(this.categories);
		this.dateConverter = new DateConverter();

		this.metadata = {
			commitMode: "Immediate",
			isReadOnly: false,
			propertyAnnotations: [
				{
					name: "id",
					ignore: true
				},
				{
					name: "wallet",
					ignore: true
				},
				{
					name: "amount",
					editor: "Decimal",
					validators: [
						{ "name": "Range", "params": { "minimum": 0, "maximum": 9999.99 } }
					]
				}
			]
		}

		this.page.on('navigatingFrom', (data) => {
			console.log("leaving page");
			this.fabPop = false;
			this.cd.detectChanges();
		})
	}

	ngAfterViewInit() {
		console.log("entering page");
		this.fabPop = true;
		this.cd.detectChanges();
	}

	get categoriesNames(): Array<string> {
		return this.categories.map(c => c.name);
	}

	public formValid() {
		// FIXME: the example at 
		// https://github.com/NativeScript/nativescript-ui-samples-angular/tree/master/dataform/app/examples/validation/check-errors
		// using ViewChild is not working.
		return true;
	}

	public save(): void {
		console.log(JSON.stringify(this.transaction));		
		this.data.saveTransaction(this.transaction).subscribe(
			t => {
				console.log('transaction saved or updated: ' + JSON.stringify(t));
				this.frame.goBack();
			},
			err => console.error(err)
		);
	}
}
