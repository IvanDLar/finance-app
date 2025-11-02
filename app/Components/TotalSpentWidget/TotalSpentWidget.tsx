'use client';
import styles from './TotalSpentWidget.module.css';

type TotalSpentWidgetProps = {
  total: number;
  type: string;
};

export default function TotalSpentWidget({
  total,
  type,
}: TotalSpentWidgetProps) {
  const widgetType = type === 'Income' ? 'income-widget' : 'expense-widget';
  return (
    <div className={styles['widget']}>
      <h2 className={styles['spent-this-month']}>{`${type}`}</h2>
      <span className={`${styles['total']} ${styles[widgetType]}`}>
        ${total.toLocaleString('en-US')}
      </span>
      <span className={`${styles['transaction-count']}`}>
        X total transactions
      </span>
    </div>
  );
}
