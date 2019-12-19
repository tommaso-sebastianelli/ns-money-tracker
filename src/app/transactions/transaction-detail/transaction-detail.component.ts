import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	public _transaction: ITransaction;
	public categories: Array<ICategory>;
	public metadata: RadFormMetadata;
	constructor(private route: ActivatedRoute) {

	}

	public get transaction(): object{
		return {...this._transaction};
	}

	public set transaction(val: object){

	}

	ngOnInit() {
		this._transaction = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.transaction;
		this.categories = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.categories;
		if (!this._transaction) {
			// FIXME should be calledfor new transaction creation
			return;
		}
		console.log("transaction-detail.component - transaction: " + JSON.stringify(this._transaction));
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
