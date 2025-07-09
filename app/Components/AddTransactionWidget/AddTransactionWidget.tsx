"use client"

import { useState } from "react";
import styles from "./AddTransactionWidget.module.css";

const AddTransactionWidget = () => {
    const [transactionType, setTransactionType] = useState<boolean | undefined>(undefined);
    const [transactionAmount, setTransactionAmount] = useState<number>(0);
    const [transactionCategory, setTransactionCategory] = useState<string>("");
    const [transactionTitle, setTransactionTitle] = useState<string>("");
    const [transactionDate, setTransactionDate] = useState<string>("");
    const [transactionPayee, setTransactionPayee] = useState<string>("");
    const [transactionAccounts, setTransactionAccounts] = useState<string| undefined >(undefined);

    const handleSetTransactionType = (type : string): undefined => {
        if (type === "income") setTransactionType(true);
        else setTransactionType(false);
    }
    return(
        <form className={styles["add-transaction-forms"]}>
            <div className={styles["transaction-type__section"]}>
                <button className={styles["type-button"]} disabled={transactionType} onClick={() => {handleSetTransactionType("income")}}>
                    Income
                </button>
                <button className={styles["type-button"]} disabled={!transactionType} onClick={() => {handleSetTransactionType("expense")}}>
                    Expense
                </button>
            </div>
            <div className={styles["transaction-card__section"]}>
                <div className={styles["transaction-card__top"]}>
                        <div className={styles["icon__section"]}>
                            Icon
                        </div>
                        <div className={styles["amount-category__section"]}>
                            <div>
                                $ <input
                                    placeholder="0"
                                    value={transactionAmount}
                                    onChange={(e) => {setTransactionAmount(Number(e.target.value))}}></input>
                            </div>
                            <div>
                                Category
                            </div>
                        </div>

                </div>
                <div className={styles["transaction-card__inputs"]}>
                    <h2 className={styles["transaction-input-title"]}>
                        Title
                    </h2>
                    <input className={styles["input-box"]} value={transactionTitle}/>
                    <h2 className={styles["transaction-input-title"]}>
                        Date
                    </h2>
                    <input className={styles["input-box"]} value={transactionDate} type="date"/>
                    <h2 className={styles["transaction-input-title"]}>
                        Payee
                    </h2>
                    <input className={styles["input-box"]} value={transactionPayee}/>
                    <h2 className={styles["transaction-input-title"]}>
                        Account(s)
                    </h2>
                    <p>Pill 1</p> <p>Pill 2</p>
                </div>
            </div>
            <button>Add Transaction</button>
        </form>
    )
};

export default AddTransactionWidget;