import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ITransaction } from '~/app/models/transaction';
import { RadFormMetadata } from '~/app/models/rad-form';
import { ICategory } from '~/app/models/category';
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
	constructor(private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.transaction = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.transaction;
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

	public categoriesNames(): Array<string> {
		return this.categories.map(c => c.description);
	}
}
