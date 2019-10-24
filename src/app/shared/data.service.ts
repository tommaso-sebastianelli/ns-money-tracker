import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { filter, flatMap, first } from "rxjs/operators";

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
            datetime: new Date().valueOf(),
            wallet: 0
        },
        {
            id: 2,
            categoryId: 1,
            categoryName: "Item 2",
            notes: "Description for Item 2",
            amount: 1.0,
            datetime: new Date().valueOf(),
            wallet: 0
        },
        {
            id: 3,
            categoryId: 1,
            categoryName: "Item 2",
            notes: "Description for Item 3",
            amount: 1.0,
            datetime: new Date().valueOf(),
            wallet: 0
        }
    );

    getAll(): Observable<Array<ITransaction>> {
        return of(this.items);
    }

    get(id: number): Observable<ITransaction> {
        return this.getAll()
            .pipe(
                flatMap((items) => items),
                filter((item: ITransaction) => item.id === id),
                first()
            );
    }
}
