import FoodBankIcon from "@mui/icons-material/FoodBank";
import styles from "./TransactionWidget.module.css";

interface TransactionWidgetType {
    name: string;
    amount: number;
    isIncome: boolean;
};

const TransactionWidget = ({ name, amount, isIncome } : TransactionWidgetType) => {
    const transactionType = isIncome ? "income" : "expense";
    return (
        <div className={styles["transaction-widget"]}>
            <FoodBankIcon className={styles["class-icon"]}/>
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