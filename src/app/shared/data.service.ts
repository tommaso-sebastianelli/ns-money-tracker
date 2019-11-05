import { Injectable } from "@angular/core";
import { Observable, of, from } from "rxjs";
import { filter, flatMap, first, scan } from "rxjs/operators";

export interface ITransaction {
    id: number;
    categoryId: number;
    categoryName: string;
    notes?: string;
    datetime: number;
    amount: number;
    wallet: number;
}

@Injectable({
    providedIn: "root"
})
export class DataService {
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

    getAll(startDate: number, endDate: number): Observable<Array<ITransaction>> {
        return from(this.items)
            .pipe(
                filter((item) => item.datetime >= startDate && item.datetime < endDate),
                scan((acc, value) => [...acc, value], [])
            );
    }

    get(id: number): Observable<ITransaction> {
        return of(this.items)
            .pipe(
                flatMap((items) => items),
                filter((item: ITransaction) => item.id === id),
                first()
            );
    }
}
