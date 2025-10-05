'use client';

import { useEffect, useState } from 'react';
import styles from './DatePicker.module.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

type MonthMapType = {
  [key: string]: string;
};

type DatePickerProps = {
  date: string;
  setDate: Function;
  setEndDate: Function;
};

const monthDaysMap: MonthMapType = {
  '01': '31',
  '02': '28',
  '03': '31',
  '04': '30',
  '05': '31',
  '06': '30',
  '07': '31',
  '08': '31',
  '09': '30',
  '10': '31',
  '11': '30',
  '12': '31',
};

const monthsMap: MonthMapType = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

export default function DatePicker({
  date,
  setDate,
  setEndDate,
}: DatePickerProps) {
  const [displayDate, setDisplayDate] = useState<string>('January 2025');
  const transformDate = (date: string): void => {
    const [year, month] = date.split('-');
    const transformedMonth = monthsMap[month];
    const transformedDate = `${transformedMonth} ${year}`;
    // Transform date
    setDisplayDate(transformedDate);
  };

  const handleDateChange = (operation: string): void => {
    const [year, month] = date.split('-');
    let integerMonth = Number(month);
    let integerYear = Number(year);

    if (operation == 'decrease') {
      if (integerMonth > 1) integerMonth -= 1;
      else {
        integerYear -= 1;
        integerMonth = 12;
      }
    } else if (operation == 'increase') {
      if (integerMonth < 12) integerMonth += 1;
      else {
        integerYear += 1;
        integerMonth = 1;
      }
    }

    // Re-build date
    const stringMonth = `${integerMonth < 10 ? '0' : ''}${String(integerMonth)}`;
    const stringDays = monthDaysMap[stringMonth];
    const newDate = `${integerYear}-${stringMonth}-01`;
    const newEndDate = `${integerYear}-${stringMonth}-${stringDays}`;

    setDate(newDate);
    setEndDate(newEndDate);

    transformDate(date);
  };

  useEffect(() => {
    transformDate(date);
  }, []);

  useEffect(() => {
    transformDate(date);
  }, [date, displayDate]);

  return (
    <div className={styles['date-picker']}>
      <a
        className={`${styles['change-date-arrows']} ${styles['left-arrow']}`}
        onClick={() => handleDateChange('decrease')}
      >
        <ArrowBackIos />
      </a>
      {date && <h1 className={styles['displayed-date']}>{displayDate}</h1>}
      <a
        className={`${styles['change-date-arrows']} ${styles['right-arrow']}`}
        onClick={() => handleDateChange('increase')}
      >
        <ArrowForwardIos />
      </a>
    </div>
  );
}
