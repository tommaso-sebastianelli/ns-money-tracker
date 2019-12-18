export interface ITransaction {
    id: number;
    categoryId: number;
    categoryName: string;
    notes?: string;
    datetime: number;
    amount: number;
    wallet: number;
}
