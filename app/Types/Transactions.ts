
export type Transaction = {
    id: number;
    date: string;
    name: string;
    amount: number;
    payee: string;
    categories: string[];
    account_id: string | null;
    is_income: boolean;
};