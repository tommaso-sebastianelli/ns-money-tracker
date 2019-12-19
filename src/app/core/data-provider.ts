import { ITransaction } from "../models/transaction";
import { ICategory } from "../models/category";
import { Observable } from "rxjs";

export interface IDataProvider {
    getTransaction: (id: number) => Observable<ITransaction>;
    getAllTransactions: (startDate: number, endDate: number) => Observable<Array<ITransaction>>;
    getCategory: (id: number) => Observable<ICategory>;
	getAllCategories: () => Observable<Array<ICategory>>;
	saveTransaction:(t: ITransaction) => Observable<ITransaction>;
}
