import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITransaction } from '~/app/models/transaction';
import { ICategory } from '~/app/models/category';
import { dataProvider } from '~/app/app.module';
import { IDataProvider } from '~/app/core/data-provider';
import { PropertyConverter } from 'nativescript-ui-dataform';

class CategoryConverter implements PropertyConverter{
	categories: Array<ICategory>;
	constructor(c: Array<ICategory>){
		this.categories = c;
	}
	convertFrom(id: number) {
		return this.categories.find((c: ICategory) => c.id === id).description;
	}	
	convertTo(name: string) {
		return this.categories.find((c: ICategory) => c.description === name).id;
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
	styleUrls: ['./transaction-detail.component.scss']
})
export class TransactionDetailComponent implements OnInit {

	public transaction: ITransaction;
	public categories: Array<ICategory>;
	public metadata: any;
	public categoryConverter; 
	public dateConverter;
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
					name:"amount",
					editor: "Decimal",
					validators: [
						{ "name": "Range", "params": { "minimum": 0 , "maximum": 9999.99} }
					]
				}
			]
		}
	}

	get categoriesNames(): Array<string>{
		return this.categories.map(c => c.description);
	}

	public formValid() {
		// FIXME: the example at 
		// https://github.com/NativeScript/nativescript-ui-samples-angular/tree/master/dataform/app/examples/validation/check-errors
		// using ViewChild is not working.
        return true;       
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
