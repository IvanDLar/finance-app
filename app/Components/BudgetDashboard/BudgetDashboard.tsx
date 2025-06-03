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
  // Initialize start and end dates
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Format as YYYY-MM-DD in local time zone
  const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const fullStartDate = formatDate(firstDay); // e.i  2025-05-01
  const fullEndDate = formatDate(lastDay);   // e.i 2025-05-31

  const [date, setDate] = useState<string>(fullStartDate);
  const [endDate, setEndDate] = useState<string>(fullEndDate)
  const [data, setData] = useState<Transaction[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [chartCountArray, setChartCountArray] = useState<(string | number)[][]>();

  const getMonthTransactions = async(date:string, endDate:string): Promise<void> => {
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

  const getMonthTransactionSum = async(date:string, endDate:string): Promise<void>  => {
    let monthTotalSum : number;
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/sum-per-month?start=${date}&end=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const sumRequest = await response.json();
      const [requestData] = sumRequest.data;
      monthTotalSum = Math.round(requestData["TransactionsSum"] * 100) / 100;
      setTotal(Math.round(requestData["TransactionsSum"] * 100) / 100);
    }
    catch(err) {
      console.log(err);
    }
  };

  const getMonthTransactionCategoryCount = async(date:string, endDate:string): Promise<[{ category: string; sum: number; }] | undefined> => {
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

  // Retrieve the data needed to fill the data in the multiple widgets of the dashboard.
  const getDashboardData = async (date:string, endDate:string) : Promise<void> => {
    await getMonthTransactions(date, endDate);
    await getMonthTransactionSum(date, endDate);
    const categoryCountArray = await getMonthTransactionCategoryCount(date, endDate);

    const newBuildGraphArray = (categoryCountArray:[{ category: string; sum: number; }] | undefined) => {
      const newChartCountArray = [];
      if (categoryCountArray !== undefined) {
        for (let element of categoryCountArray) {
          newChartCountArray.push([element.category, Number(element.sum)]);
      }
      newChartCountArray.unshift(["Categories", "Transaction Sum"]);
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
              {chartCountArray && <SpendingGraph totalSum = {total} chartCountArray={chartCountArray}/>}
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
