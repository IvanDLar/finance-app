"use client"
import styles from "./TotalSpent.module.css";

type TotalSpentProps = {
    total: number;
}

export default function TotalSpent ({ total } : TotalSpentProps) {
    return (
        <h2 className={styles["spent-this-month"]}>
            {"Total Spent This Month: "}
            <span className={styles["total"]}>${total}</span>
        </h2>
    )
}