
export type Transaction = {
    id: number;
    date: string;
    name: string;
    amount: number;
    payee: string;
    category: "Pets" | "Dinning" | "Groceries" | "Shopping" | "Transit" | "Entertainment" | "Bills & Fees" | "Gifts" | "Beauty" | "Work" | "Travel" | "Balance Correction" | "Income" | "Housing" | "Health";
    account_id: string | null;
    is_income: boolean;
};