'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './SpendingGraph.module.css';
import { Transaction } from '@/app/Types/Transactions';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

type TransactionsGraphProps = {
  transactions: Transaction[];
  date: string;
};

const AVAILABLE_CATEGORIES_STYLES: Record<
  string,
  { backgroundColor: string; borderColor: string }
> = {
  Pets: {
    backgroundColor: 'rgba(102, 126, 234, 0.2)',
    borderColor: 'rgba(102, 126, 234, 1)',
  },
  Dinning: {
    backgroundColor: 'rgba(75, 192, 75, 0.2)',
    borderColor: 'rgba(75, 192, 75, 1)',
  },
  Groceries: {
    backgroundColor: 'rgba(255, 206, 86, 0.2)',
    borderColor: 'rgba(255, 206, 86, 1)',
  },
  Shopping: {
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
  },
  Transit: {
    backgroundColor: 'rgba(255, 159, 64, 0.2)',
    borderColor: 'rgba(255, 159, 64, 1)',
  },
  Entertainment: {
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgba(54, 162, 235, 1)',
  },
  'Bills & Fees': {
    backgroundColor: 'rgba(46, 204, 113, 0.2)',
    borderColor: 'rgba(46, 204, 113, 1)',
  },
  Gifts: {
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
  },
  Beauty: {
    backgroundColor: 'rgba(255, 182, 193, 0.2)',
    borderColor: 'rgba(255, 182, 193, 1)',
  },
  Work: {
    backgroundColor: 'rgba(218, 165, 32, 0.2)',
    borderColor: 'rgba(218, 165, 32, 1)',
  },
  Travel: {
    backgroundColor: 'rgba(21, 101, 192, 0.2)',
    borderColor: 'rgba(21, 101, 192, 1)',
  },
  'Balance Correction': {
    backgroundColor: 'rgba(201, 203, 207, 0.2)',
    borderColor: 'rgba(201, 203, 207, 1)',
  },
  Income: {
    backgroundColor: 'rgba(153, 102, 255, 0.2)',
    borderColor: 'rgba(153, 102, 255, 1)',
  },
  Housing: {
    backgroundColor: 'rgba(255, 140, 0, 0.2)',
    borderColor: 'rgba(255, 140, 0, 1)',
  },
  Health: {
    backgroundColor: 'rgba(0, 150, 136, 0.2)',
    borderColor: 'rgba(0, 150, 136, 1)',
  },
};

export default function SpendingGraph({
  transactions,
  date,
}: TransactionsGraphProps) {
  const [pieChartData, setPieChartData] = React.useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }>();

  React.useEffect(() => {
    let tempTransactionsPerCategory: { [k: string]: number } = {};

    for (let transaction of transactions) {
      if (!tempTransactionsPerCategory[transaction.category]) {
        tempTransactionsPerCategory[transaction.category] = transaction.amount;
      } else {
        tempTransactionsPerCategory[transaction.category] =
          tempTransactionsPerCategory[transaction.category] +
          transaction.amount;
      }
    }

    // Extract keys first to use on matching styles with category, this ensures
    // constant matching (Object.keys() extraction does not ensure order)
    const transactionsPerCategoryKeys =
      tempTransactionsPerCategory && Object.keys(tempTransactionsPerCategory);

    const stylesToUse = transactionsPerCategoryKeys.filter((category) => {
      return AVAILABLE_CATEGORIES_STYLES[category];
    });

    const backgroundColorsToUse = stylesToUse.map((category) => {
      return AVAILABLE_CATEGORIES_STYLES[category].backgroundColor;
    });

    const borderColorsToUse = stylesToUse.map((category) => {
      return AVAILABLE_CATEGORIES_STYLES[category].borderColor;
    });

    const data = {
      labels: tempTransactionsPerCategory ? transactionsPerCategoryKeys : [],
      datasets: [
        {
          label: 'Total',
          data: tempTransactionsPerCategory
            ? Object.values(tempTransactionsPerCategory)
            : [],
          backgroundColor: backgroundColorsToUse,
          borderColor: borderColorsToUse,
          borderWidth: 1,
        },
      ],
    };
    setPieChartData(data);
  }, [transactions, date]);

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartContainer}>
        {pieChartData && <Pie data={pieChartData} />}
      </div>
    </div>
  );
}
