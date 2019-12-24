import { Injectable } from "@angular/core";
import { Observable, of, from, throwError, EMPTY } from "rxjs";
import { filter, flatMap, scan } from "rxjs/operators";
import { ITransaction } from "./models/transaction";
import { ICategory } from "./models/category";
import { IDataProvider } from "./data-provider";
import { CoreModule } from "./core.module";

@Injectable({
	providedIn: CoreModule
})
export class DataServiceMock implements IDataProvider {

	private transactions = new Array<ITransaction>(
		{
			id: 1,
			categoryId: 1,
			notes: "Description for Item 1",
			amount: 1.0,
			datetime: new Date().valueOf(),
			wallet: 0
		},
		{
			id: 2,
			categoryId: 1,
			notes: "Description for Item 2",
			amount: 1.0,
			datetime: new Date(2019, 10, 1).valueOf(),
			wallet: 0
		},
		{
			id: 3,
			categoryId: 1,
			notes: "Description for Item 3",
			amount: 1.0,
			datetime: new Date(2019, 7, 12).valueOf(),
			wallet: 0
		},
		{
			id: 4,
			categoryId: 2,
			notes: "Description for Item 4",
			amount: 1.0,
			datetime: new Date().valueOf(),
			wallet: 0
		},
		{
			id: 5,
			categoryId: 3,
			notes: "Description for Item 5",
			amount: 1.0,
			datetime: new Date(2019, 9, 22).valueOf(),
			wallet: 0
		}
	);


	/* TODO: 
	Clothing
	Grocery
	Hobbies
	Rent
	Restaurant
	Sport
	Studies
	Taxes
	Tech
	Transportations
	Travels
	*/
	private categories: Array<ICategory> = [
		{
			id: 1,
			name: "Clothing",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 2,
			name: "Grocery",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 3,
			name: "Hobbies",
			color: "#d84315",
			icon: ""
		},
		{
			id: 4,
			name: "Rent",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 5,
			name: "Restaurant",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 6,
			name: "Sport",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 7,
			name: "Studies",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 8,
			name: "Taxes",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 9,
			name: "Tech",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 10,
			name: "Transportations",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 11,
			name: "Travels",
			color: "#64b5f6",
			icon: ""
		}
	];

	getAllCategories(): Observable<Array<ICategory>> {
		return of(this.categories);
	}

	getCategory(cId: number) {
		return of(this.categories.find(({ id }) => id == cId));
	}

	getAllTransactions(startDate: number, endDate: number): Observable<Array<ITransaction>> {
		return from(this.transactions)
			.pipe(
				filter((item) => item.datetime >= startDate && item.datetime < endDate),
				scan((acc, value) => [...acc, value], [])
			);
	}

	getTransaction(id: number): Observable<ITransaction> {
		return of(this.transactions)
			.pipe(
				flatMap((items) => {
					const result = items.find(item => item.id == id);
					return of(result) || EMPTY;
				})
			);
	}

	saveTransaction(t: ITransaction): Observable<ITransaction> {
		if (!t.id) {
			t.id = this.transactions.length;
			this.transactions.push(t);
		} else {
			const i = this.transactions.findIndex(_t => _t.id == t.id);
			this.transactions.splice(i, 1, t);
		}
		return of(t);
	}
}
