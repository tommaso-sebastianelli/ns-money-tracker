import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from '~/app/models/transaction';
import { RadFormMetadata } from '~/app/models/rad-form';
import { ICategory } from '~/app/models/category';
import { dataProvider } from '~/app/app.module';
import { IDataProvider } from '~/app/core/data-provider';

import { registerElement } from 'nativescript-angular/element-registry';
registerElement(
  'Fab',
  () => require('@nstudio/nativescript-floatingactionbutton').Fab
);

@Component({
	selector: 'ns-transaction-detail',
	templateUrl: './transaction-detail.component.html',
	styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
	public transaction: ITransaction;
	public categories: Array<ICategory>;
	public metadata: RadFormMetadata;
	constructor(private route: ActivatedRoute, public router: Router, @Inject(dataProvider) private data: IDataProvider, ) {

	}

	ngOnInit() {
		const data = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.transaction;
		this.transaction = { ...data };
		this.categories = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.categories;
		if (!this.transaction) {
			// FIXME should be calledfor new transaction creation
			return;
		}
		console.log("transaction-detail.component - transaction: " + JSON.stringify(this.transaction));
		this.metadata = <RadFormMetadata>{
			commitMode: "Immediate",
			isReadOnly: false,
			propertyAnnotations: [
				{
					name: "categoryId",
					displayName: "Category",
					editor: "Picker",
					valuesProvider: this.categories.map(c => c.description),
					index: 0,
					required: true 
				},
				{
					name: "id",
					ignore: true
				},
				{
					name: "wallet",
					ignore: true
				}
			]
		}
	}

	public save(): void {
		console.log(JSON.stringify(this.transaction));

		// let t = this.transaction;
		// this.data.saveTransaction(t).subscribe(
		// 	ok => {
		// 		this.router.navigateByUrl('default');
		// 	},
		// 	err => console.error(err)
		// );
	}
}
