import { Injectable } from "@angular/core";
import { Observable, of, from, throwError, EMPTY } from "rxjs";
import { filter, flatMap, scan, first, toArray, tap } from "rxjs/operators";
import { ITransaction } from "./models/transaction";
import { ICategory } from "./models/category";
import { IDataProvider } from "./data-provider";
import { CoreModule } from "./core.module";

@Injectable({
	providedIn: CoreModule
})
export class DataServiceMock implements IDataProvider {

	private CURRENT_YEAR = new Date().getFullYear();
	private CURRENT_MONTH = new Date().getMonth();

	private ACTUAL_MONTH_DATA: Array<ITransaction> = [
		{
			id: 1,
			categoryId: 4,
			notes: "room rent",
			amount: 300.00,
			datetime: new Date().valueOf(),
			wallet: 0
		},
		{
			id: 2,
			categoryId: 10,
			notes: "bus ticket",
			amount: 2.00,
			datetime: new Date().valueOf(),
			wallet: 0
		},
		{
			id: 3,
			categoryId: 5,
			notes: "grill",
			amount: 35.90,
			datetime: new Date().valueOf(),
			wallet: 0
		},
		{
			id: 4,
			categoryId: 2,
			notes: "",
			amount: 37.90,
			datetime: new Date().valueOf(),
			wallet: 0
		},
		{
			id: 5,
			categoryId: 10,
			notes: "bus ticket",
			amount: 2.00,
			datetime: new Date().valueOf(),
			wallet: 0
		},
		{
			id: 6,
			categoryId: 2,
			notes: "",
			amount: 79.90,
			datetime: new Date().valueOf(),
			wallet: 0
		}
	];

	// private PREV_MONTH_DATA: Array<ITransaction> = [];

	private transactions = [...this.ACTUAL_MONTH_DATA];

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
			color: "#90a4ae",
			icon: "t-shirt"
		},
		{
			id: 2,
			name: "Groceries",
			color: "#81c784",
			icon: "groceries"
		},
		{
			id: 3,
			name: "Hobbies",
			color: "#81c784",
			icon: "game"
		},
		{
			id: 4,
			name: "Rent",
			color: "#e57373",
			icon: "house"
		},
		{
			id: 5,
			name: "Restaurant",
			color: "#ffe082",
			icon: "restaurant"
		},
		{
			id: 6,
			name: "Sport",
			color: "#4db6ac",
			icon: "gym"
		},
		{
			id: 7,
			name: "Studies",
			color: "#bcaaa4",
			icon: "mortarboard"
		},
		{
			id: 8,
			name: "Taxes",
			color: "#ba68c8",
			icon: "cash"
		},
		{
			id: 9,
			name: "Tech",
			color: "#4dd0e1",
			icon: "laptop"
		},
		{
			id: 10,
			name: "Transportations",
			color: "#ffb74d",
			icon: "train"
		},
		{
			id: 11,
			name: "Travels",
			color: "#64b5f6",
			icon: "boarding-pass"
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
				toArray()
			)
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
			t.id = this.transactions.length + 1;
			this.transactions.push(t);
		} else {
			const i = this.transactions.findIndex(_t => _t.id == t.id);
			if (i < 0) {
				throwError('not found!');
			}
			this.transactions.splice(i, 1, t);
		}
		return of(t);
	}

	deleteTransaction(t: ITransaction): Observable<null> {
		const i = this.transactions.findIndex(_t => _t.id == t.id);
		if (i < 0) {
			throwError('not found!');
		}
		this.transactions.splice(i, 1);

		return of(null);
	}
}
