import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ITransaction } from '~/app/models/transaction';

@Component({
	selector: 'ns-transaction-detail',
	templateUrl: './transaction-detail.component.html',
	styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {
	public model: ITransaction;
	constructor(private route: ActivatedRoute) {

	}

	ngOnInit() {
		this.model = this.route.snapshot && this.route.snapshot.data && this.route.snapshot.data.transaction;
		console.log("transaction-detail.component - transaction: " + JSON.stringify(this.model));
	}
}
