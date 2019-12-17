import { Observable } from "tns-core-modules/data/observable";
import { ITransaction } from "~/app/shared/transaction";

export class TransactionViewModel extends Observable {

    constructor(t: ITransaction) {
        super();
        this.transaction = t;
    }

    set transaction(value: ITransaction) {
        this.set("_transaction", value);
    }

    get transaction(): ITransaction {
        return this.get("_transaction");
    }
}