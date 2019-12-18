import { Injectable } from "@angular/core";
import { Observable, of, from, throwError, EMPTY } from "rxjs";
import { filter, flatMap, scan } from "rxjs/operators";
import { ITransaction } from "../models/transaction";
import { ICategory } from "../models/category";
import { IDataProvider } from "./data-provider";
import { CoreModule } from "./core.module";

@Injectable({
	providedIn: CoreModule
})
export class DataServiceMock implements IDataProvider {

	private items = new Array<ITransaction>(
		{
			id: 1,
			categoryId: 1,
			categoryName: "Item 1",
			notes: "Description for Item 1",
			amount: 1.0,
			datetime: new Date(2019, 9, 1).valueOf(),
			wallet: 0
		},
		{
			id: 2,
			categoryId: 1,
			categoryName: "Item 2",
			notes: "Description for Item 2",
			amount: 1.0,
			datetime: new Date(2019, 10, 1).valueOf(),
			wallet: 0
		},
		{
			id: 3,
			categoryId: 1,
			categoryName: "Item 3",
			notes: "Description for Item 3",
			amount: 1.0,
			datetime: new Date(2019, 7, 12).valueOf(),
			wallet: 0
		},
		{
			id: 4,
			categoryId: 1,
			categoryName: "Item 4",
			notes: "Description for Item 4",
			amount: 1.0,
			datetime: new Date(2019, 6, 10).valueOf(),
			wallet: 0
		},
		{
			id: 5,
			categoryId: 1,
			categoryName: "Item 5",
			notes: "Description for Item 5",
			amount: 1.0,
			datetime: new Date(2019, 9, 22).valueOf(),
			wallet: 0
		}
	);

	private categories: Array<ICategory> = [
		{
			id: 1,
			description: "Food",
			color: "#ffd54f",
			icon: ""
		},
		{
			id: 2,
			description: "Clothing",
			color: "#64b5f6",
			icon: ""
		},
		{
			id: 3,
			description: "Transportations",
			color: "#d84315",
			icon: ""
		}
	];

	getAllCategories(): Observable<Array<ICategory>> {
		return throwError("not implemented");
	}

	getCategory(cId: number) {
		return of(this.categories.find(({ id }) => id === cId));
	}

	getAllTransactions(startDate: number, endDate: number): Observable<Array<ITransaction>> {
		return from(this.items)
			.pipe(
				filter((item) => item.datetime >= startDate && item.datetime < endDate),
				scan((acc, value) => [...acc, value], [])
			);
	}

	getTransaction(id: number): Observable<ITransaction> {
		return of(this.items)
			.pipe(
				flatMap((items) => {
					const result = items.find(item => item.id == id);
					return of(result) || EMPTY;
				})
			);
	}
}
