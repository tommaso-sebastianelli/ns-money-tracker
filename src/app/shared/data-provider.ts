import { ITransaction } from "./transaction";
import { ICategory } from "./category";
import { Observable } from "rxjs";

export interface IDataProvider {
    getTransaction: (id: number) => Observable<ITransaction>;
    getAllTransactions: (startDate: number, endDate: number) => Observable<Array<ITransaction>>;
    getCategory: (id: number) => Observable<ICategory>;
    getAllCategories: () => Observable<Array<ICategory>>;
}
