import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ITransaction } from '~/app/models/transaction';
import { RadMetadata } from '~/app/models/rad-form';

@Component({
	selector: 'ns-transaction-detail',
	templateUrl: './transaction-detail.component.html',
	styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
	public model: ITransaction;
	private metadata: RadMetadata;
	constructor(private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.model = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.transaction;
		if(!this.model){
			// FIXME should be calledfor new transaction creation
			return;
		}
		console.log("transaction-detail.component - transaction: " + JSON.stringify(this.model));
		this.metadata = <RadMetadata>{
			commitMode: "Manual",
			isReadOnly: false,
			propertyAnnotations: [
				{
					name: "categoryName",
					displayName: "category",
					readOnly: true,
					index: 0,
					valuesProvider: [],
					validators: []
				},{
					name: "amount",
					displayName: "amount",
					index: 1
				},
			]
		}
	}
}
