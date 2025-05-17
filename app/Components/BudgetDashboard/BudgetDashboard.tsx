"use client"

import styles from "./BudgetDashboard.module.css";
import DatePicker from "../DatePicker/DatePicker";
import TotalSpent from "../TotalSpent/TotalSpent";
import TransactionsTable from "../TransactionsTable/TransactionsTable";
import SpendingGraph from "../SpendingGraph/SpendingGraph";
import { useState, useEffect } from "react";
import { Transaction } from "@/app/Types/Transactions";
import MyButton from "../Button/Button";

export default function BudgetDashboard() {
  // TODO

 // replace date with startDate and set it to that. Create a new endDate state to control the querying of the data.

  // TODO
  const [date, setDate] = useState<string>("2025-01-01");
  const [endDate, setEndDate] = useState<string>("2025-01-31")
  const [data, setData] = useState<Transaction[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [chartCountArray, setChartCountArray] = useState<(string | number)[][]>();

  const getMonthTransactions = async(date:string, endDate:string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/all-per-month?start=${date}&end=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const transactionsRequest = await response.json();
      setData(transactionsRequest.transactions);
    }
    catch(err) {
      console.log(err);
    }
  };

  const getMonthTransactionSum = async(date:string, endDate:string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/sum-per-month?start=${date}&end=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const sumRequest = await response.json();
      const [requestData] = sumRequest.data;
      setTotal(Math.round(requestData["TransactionsSum"] * 100) / 100);
    }
    catch(err) {
      console.log(err);
    }
  };

  const getMonthTransactionCategoryCount = async(date:string, endDate:string): Promise<[{ category: string; count: number; }] | undefined> => {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/category-count?start=${date}&end=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const categoryCountRequest = await response.json();

      if (categoryCountRequest.data) {
        const categoryCountArray = categoryCountRequest.data;
        return categoryCountArray;
      }
    }
    catch(err) {
      console.log(err);
    }
  };
  const getDashboardData = async (date:string, endDate:string) : Promise<void> => {
    await getMonthTransactions(date, endDate);
    await getMonthTransactionSum(date, endDate);
    const categoryCountArray = await getMonthTransactionCategoryCount(date, endDate);

    const newBuildGraphArray = (categoryCountArray:[{ category: string; count: number; }] | undefined) => {
      const newChartCountArray = [];
      if (categoryCountArray !== undefined) {
        for (let element of categoryCountArray) {
          newChartCountArray.push([element.category, Number(element.count)]);
      }
      newChartCountArray.unshift(["Categories", "Transaction Count"]);
      setChartCountArray(newChartCountArray);
      }
    };

    newBuildGraphArray(categoryCountArray);
  }
  useEffect(() => {
    const updateDashboardData = async () => {
      await getDashboardData(date, endDate);
    }
    updateDashboardData();
  }, [date, endDate]);

  return (
    <div className={styles.page}>
      <DatePicker date={date} setDate={setDate} setEndDate={setEndDate}/>
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
            <TransactionsTable date= {date} endDate = {endDate} getDashboardData={getDashboardData} data={data}/>
          </div>
      </div>
      <div className={styles["add-transaction__section"]}>
        <MyButton url="/add-transaction" text="Add Transaction"/>
      </div>
    </div>
  );
}
