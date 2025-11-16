'use client';
import styles from './TotalSpentWidget.module.css';

type TotalSpentWidgetProps = {
  total: number;
  type?: string;
};

export default function TotalSpentWidget({
  total,
  type,
}: TotalSpentWidgetProps) {
  let widgetType;
  if (type === 'Income') widgetType = 'income-widget';
  else if (type === 'Expense') widgetType = 'expense-widget';
  else widgetType = 'total-widget';

  const isWidgetLarge = widgetType === 'total-widget' && styles['widget-large'];

  // Decide color of total widget - positive = purple, negative = red
  if (widgetType === 'total-widget') {
    if (total >= 0) widgetType = 'income-widget';
    else widgetType = 'expense-widget';
  }
  return (
    <div className={`${styles['widget']} ${isWidgetLarge}`}>
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
