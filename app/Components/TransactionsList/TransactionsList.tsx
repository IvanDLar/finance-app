import TransactionWidget from '../TransactionWidget/TransactionWidget';
import { Transaction } from '@/app/Types/Transactions';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useStyletron } from 'styletron-react';

type TransactionsT = Transaction[];
type TransactionsPerDayT = [string, TransactionsT][];
type TransactionsPerDayMapT = {
  [key: string]: TransactionsT;
};

// TODO: Tiddy up a bit the logic here and give the date a style.
const TransactionsList = ({ data }: { data: TransactionsT }) => {
  const [transactionsPerDay, setTransactionsPerDay] =
    useState<TransactionsPerDayT>([]);
  const [css] = useStyletron();

  const groupTransactionsPerDate = () => {
    if (!data || !data.length) setTransactionsPerDay([]);
    let transactionsPerDayMap: TransactionsPerDayMapT = {};
    for (let transaction of data) {
      let momentDate = moment(transaction.date);
      let momentFormatedDate = momentDate.format('L');

      // We know that the dates are ordered, so we can assume and iterate
      // through them and knoe 0 -> n are in order, we just need to group them by date.
      if (transactionsPerDayMap[momentFormatedDate]) {
        const existingArray = transactionsPerDayMap[momentFormatedDate];
        existingArray.push(transaction);
        transactionsPerDayMap[momentFormatedDate] = existingArray;
      } else {
        transactionsPerDayMap[momentFormatedDate] = [transaction];
      }
    }

    // Turn the map into an array and order it by date
    let ascendingOrderedObject: TransactionsPerDayT = Object.entries(
      transactionsPerDayMap,
    ).sort((a, b) => moment(b[0]).diff(moment(a[0])));

    setTransactionsPerDay(ascendingOrderedObject);
  };

  useEffect(() => {
    groupTransactionsPerDate();
  }, [data]);

  return (
    <div>
      {transactionsPerDay.map((dateTransactions) => {
        const [date, datesArray] = dateTransactions;
        return (
          <React.Fragment key={date}>
            <div
              className={css({
                fontSize: '12px',
                color: '#6B726C',
              })}
            >
              {date}
            </div>
            {datesArray.map((transaction) => {
              return (
                <TransactionWidget
                  name={transaction.name}
                  amount={transaction.amount}
                  isIncome={transaction.is_income}
                  category={transaction.category}
                  key={`${transaction.id}`}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default TransactionsList;
