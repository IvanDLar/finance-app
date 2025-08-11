import styles from "./TransactionWidget.module.css";
import CategoryIcon from '@/app/Components/CategoryIcon/CategoryIcon';

interface TransactionWidgetType {
    name: string;
    amount: number;
    isIncome: boolean;
    category: "Pets" | "Dinning" | "Groceries" | "Shopping" | "Transit" | "Entertainment" | "Bills & Fees" | "Gifts" | "Beauty" | "Work" | "Travel" | "Balance Correction" | "Income" | "Housing" | "Health";
};

const TransactionWidget = ({ name, amount, isIncome, category } : TransactionWidgetType) => {
    const transactionType = isIncome ? "income" : "expense";
    return (
        <div className={styles["transaction-widget"]}>
            <CategoryIcon category={category} type='static'/>
            <p className={styles["transaction-title"]}>
                {name}
            </p>
            <p className={`${styles["transaction-amount"]} ${styles[transactionType]}`}>
                {isIncome ? `+ $${amount.toLocaleString('en-US')}` : `- $${amount.toLocaleString('en-US')}`}
            </p>
        </div>
    );
}

export default TransactionWidget;
