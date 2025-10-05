'use client';

import { useState, useEffect } from 'react';
import styles from './BudgetDashboard.module.css';
import DatePicker from '../DatePicker/DatePicker';
import TotalSpentWidget from '../TotalSpentWidget/TotalSpentWidget';
import SpendingGraph from '../SpendingGraph/SpendingGraph';
import { Transaction } from '@/app/Types/Transactions';
import MyButton from '../Button/Button';
// import TransactionVanillaTable from '../TransactionVanillaVanilla.tsx/TransactionTableVanilla';
import TransactionsList from '../TransactionsList/TransactionsList';

interface BudgetDashboardType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

const BASE_URL =
  process.env.VERCEL_ENV == 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'https://reimagined-space-potato-jw54r54774cqpxw-3000.app.github.dev/';
export default function BudgetDashboard({ session }: BudgetDashboardType) {
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
  const fullEndDate = formatDate(lastDay); // e.i 2025-05-31

  const [date, setDate] = useState<string>(fullStartDate);
  const [endDate, setEndDate] = useState<string>(fullEndDate);
  const [data, setData] = useState<Transaction[]>([]);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [chartCountArray, setChartCountArray] =
    useState<(string | number)[][]>();

  const getMonthTransactions = async (
    date: string,
    endDate: string,
  ): Promise<void> => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/supa-endpoints/transactions/all-per-month?start=${date}&end=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      const transactionsRequest = await response.json();
      setData(transactionsRequest.transactions);
    } catch (err) {
      throw new Error(`[ERROR]: ${err}`);
    }
  };

  const getMonthTransactionSumPerType = async (
    date: string,
    endDate: string,
    type: string,
  ): Promise<void> => {
    let monthTotalSum: number;
    try {
      const isIncome = type === 'income';
      const response = await fetch(
        `${BASE_URL}/api/supa-endpoints/transactions/sum-per-month?start=${date}&end=${endDate}&is_income=${isIncome}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      const sumRequest = await response.json();
      const requestData = sumRequest.data;
      monthTotalSum = Math.round(requestData * 100) / 100;

      if (isIncome) setTotalIncome(monthTotalSum);
      else setTotalExpense(monthTotalSum);
    } catch (err) {
      throw new Error(`[ERROR]: ${err}`);
    }
  };

  const getMonthTransactionCategoryCount = async (
    date: string,
    endDate: string,
  ): Promise<[{ category: string; sum: number }] | undefined> => {
    try {
      const response = await fetch(
        `https://reimagined-space-potato-jw54r54774cqpxw-3000.app.github.dev/api/transactions/category-count?start=${date}&end=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const categoryCountRequest = await response.json();

      if (categoryCountRequest.data) {
        const categoryCountArray = categoryCountRequest.data;
        return categoryCountArray;
      }
    } catch (err) {
      throw new Error(`[ERROR]: ${err}`);
    }
  };

  // Retrieve the data needed to fill the data in the multiple widgets of the dashboard.
  const getDashboardData = async (
    date: string,
    endDate: string,
  ): Promise<void> => {
    await getMonthTransactions(date, endDate);
    await getMonthTransactionSumPerType(date, endDate, 'income');
    await getMonthTransactionSumPerType(date, endDate, 'expense');
    const categoryCountArray = await getMonthTransactionCategoryCount(
      date,
      endDate,
    );

    const newBuildGraphArray = (
      categoryCountArray: [{ category: string; sum: number }] | undefined,
    ) => {
      const newChartCountArray = [];
      if (categoryCountArray !== undefined) {
        for (let element of categoryCountArray) {
          newChartCountArray.push([element.category, Number(element.sum)]);
        }
        newChartCountArray.unshift(['Categories', 'Transaction Sum']);
        setChartCountArray(newChartCountArray);
      }
    };

    newBuildGraphArray(categoryCountArray);
  };

  useEffect(() => {
    const updateDashboardData = async () => {
      await getDashboardData(date, endDate);
    };
    updateDashboardData();
  }, [date, endDate]);

  return (
    <div className={styles.page}>
      <DatePicker date={date} setDate={setDate} setEndDate={setEndDate} />
      <div className={styles['total-spent__section']}>
        <TotalSpentWidget total={totalIncome} type="Income" />
        <TotalSpentWidget total={totalExpense} type="Expense" />
      </div>
      <div className={styles['information__section']}>
        <div className={styles['information__graph']}>
          <h2>Expenses by Category</h2>
          {chartCountArray && (
            <SpendingGraph
              totalSum={totalExpense}
              chartCountArray={chartCountArray}
            />
          )}
        </div>
        <div className={styles['transactions__section']}>
          <h2>Transactions this month</h2>
          <div>
            <TransactionsList data={data} />
          </div>
          {/* <TransactionVanillaTable date= {date} endDate = {endDate} getDashboardData={getDashboardData} data={data}/> */}
        </div>
      </div>
      <div className={styles['add-transaction__section']}>
        <MyButton url="/routes/add-transaction" text="Add Transaction" />
      </div>
    </div>
  );
}
