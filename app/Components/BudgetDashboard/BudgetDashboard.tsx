"use client"

import styles from "./BudgetDashboard.module.css";
import DatePicker from "../DatePicker/DatePicker";
import TotalSpent from "../TotalSpent/TotalSpent";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import SpendingGraph from "../SpendingGraph/SpendingGraph";
import { useState, useEffect } from "react";

type Transaction = {
  date: string;
  amount: number;
  payee: string;
  category: string;
}

type BudgetDashboardProps = {
  transactions: Transaction[];
}

export default function BudgetDashboard({ transactions }: BudgetDashboardProps) {
  const [date, setDate] = useState<string>("2025-01");
  const [data, setData] = useState<Transaction[]>(transactions);
  const [total, setTotal] = useState<number>(0);
  const [chartCountArray, setChartCountArray] = useState<(string | number)[][]>();

  const filterDataPerMonth = (date:string) => {
    let newTotal = 0;
    let newTransactionsArray: Transaction[] = [];
    let monthRegEx = new RegExp(`${date}-*`)
    let foundFirst = false;
    let categoryCountMap = new Map();

    // Dummy logic, it would be much better to rather pre-process the data and store
    // it in a more complex but more efficient patter.
    /* Parse the JSON to store in keys with the YYYY-MM as key, all in the while
    generating a new json that stores the total per month (to access directly).

    If a transaction is added/removed to the transactions json, just add/remove that from
    the total, instead of having to recalculate everything over and over again.
    */
    for (let i = 0; i < transactions.length; i++) {
        let transaction = transactions[i];
        const transactionCategory = transaction.category;
        if (foundFirst) {
            newTotal += transaction.amount;
            newTransactionsArray.push(transaction);

            // Set Category
            if (categoryCountMap.has(transactionCategory)) {
              const newTransactionCategoryCount = categoryCountMap.get(transactionCategory) + 1;
              categoryCountMap.set(transactionCategory,newTransactionCategoryCount);
            } else {
                categoryCountMap.set(transactionCategory, 1);
            }

            // Break out of the loop once the next date does not match!
            if(!monthRegEx.exec(transactions[i + 1]?.date)) {
                break;
            }
        }
        else if (!foundFirst) {
            let isSearchMonth = monthRegEx.exec(transaction?.date);
            if (isSearchMonth) {
                foundFirst = true;
                newTotal += transaction.amount;
                newTransactionsArray.push(transaction);
                categoryCountMap.set(transactionCategory, 1);
            }
        }
    }
    buildGraphArray(categoryCountMap);
    setData(newTransactionsArray);
    setTotal(Math.ceil(newTotal * 100) / 100);
  };

  const buildGraphArray = (categoryCountMap:Map<string, number>) => {
    const newChartCountArray = [];
    for (let [key, value] of categoryCountMap) {
        newChartCountArray.push([key, value]);
    }
    newChartCountArray.unshift(["Categories", "Transaction Count"]);
    setChartCountArray(newChartCountArray);
  };

  useEffect(() => {
    filterDataPerMonth(date);
  }, [date]);

  return (
    <div className={styles.page}>
      <DatePicker date={date} setDate={setDate}/>
      <div className={styles["total-spent__section"]}>
        <TotalSpent total={total}/>
      </div>
      <div className={styles["information__section"]}>
          <div className={styles["information__graph"]}>
              <h2>
                Expenses by Category
              </h2>
              {chartCountArray && <SpendingGraph chartCountArray={chartCountArray}/>}
          </div>
          <div className={styles["information__table"]}>
            <h2>
              Transactions this month
            </h2>
            <TransactionsTable data={data}/>
          </div>
      </div>
    </div>
  );
}
