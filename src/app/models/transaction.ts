export interface ITransaction {
    id: number;
    categoryId: number;
    notes?: string;
    datetime: number;
    amount: number;
    wallet: number;
}
