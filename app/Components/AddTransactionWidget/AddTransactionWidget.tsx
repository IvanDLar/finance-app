'use client';

import { useState } from 'react';
import styles from './AddTransactionWidget.module.css';
import MyButton from '../Button/Button';
import toast from 'react-hot-toast';
import CategoryIcon from '../CategoryIcon/CategoryIcon';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
} from 'baseui/modal';
import { KIND as ButtonKind } from 'baseui/button';
import type { Categories } from '@/app/Types/Categories';
import { useStyletron } from 'styletron-react';
import { Category } from '@mui/icons-material';

const BASE_URL =
  process.env.VERCEL_ENV == 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'https://reimagined-space-potato-jw54r54774cqpxw-3000.app.github.dev/';

const AVAILABLE_CATEGORIES: Categories[] = [
  'Pets',
  'Dinning',
  'Groceries',
  'Shopping',
  'Transit',
  'Entertainment',
  'Bills & Fees',
  'Gifts',
  'Beauty',
  'Work',
  'Travel',
  'Balance Correction',
  'Income',
  'Housing',
  'Health',
];

const CategoryModal = ({
  isCategoryModalOpen,
  setIsCategoryModalOpen,
}: {
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (value: boolean) => void;
}) => {
  const [selectedTransactionCategory, setSelectedTransactionCategory] =
    useState<Categories>(AVAILABLE_CATEGORIES[0]);
  const [css] = useStyletron();

  return (
    <Modal
      isOpen={isCategoryModalOpen}
      closeable
      onClose={() => setIsCategoryModalOpen(false)}
      animate
      autoFocus
    >
      <ModalHeader>Hello world</ModalHeader>
      <ModalBody
        className={css({
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        })}
      >
        {AVAILABLE_CATEGORIES.map((category: Categories) => {
          return (
            <div
              key={category}
              className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              })}
            >
              <CategoryIcon category={category} type="static" />
              {category}
            </div>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
        <ModalButton>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

const AddTransactionWidget = ({ session }: any) => {
  const [transactionType, setTransactionType] = useState<boolean>(true);
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [transactionCategory, setTransactionCategory] =
    useState<Categories>('Bills & Fees');
  const [transactionTitle, setTransactionTitle] = useState<string>('');
  const [transactionDate, setTransactionDate] = useState<string>('');
  const [transactionPayee, setTransactionPayee] = useState<string>('');
  const [transactionAccounts, setTransactionAccounts] = useState<
    string | undefined
  >(undefined);

  // Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);

  const handleSetTransactionType = (type: string): undefined => {
    if (type === 'income') setTransactionType(true);
    else setTransactionType(false);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const values = {
        date: transactionDate,
        amount: transactionAmount,
        payee: transactionPayee,
        isIncome: transactionType,
        title: transactionTitle,
        category: 'Pets',
      };
      toast.promise(
        async () => {
          const response = await fetch(
            `${BASE_URL}/api/supa-endpoints/transactions/index`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session?.access_token}`,
              },
              body: JSON.stringify(values),
            },
          );
          console.log(values);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
          }
          return data;
        },
        {
          loading: 'Loading...',
          success: (data) => (
            <div className={styles.toastContainer}>
              <span>Successfully added your transaction!</span>
              <button
                onClick={() => toast.dismiss()}
                className={styles.toastClose}
              >
                ✖
              </button>
            </div>
          ),
          error: (err) => (
            <div className={styles.toastContainer}>
              <span>
                {err.message || 'Error while adding your transaction!'}
              </span>
              <button
                onClick={() => toast.dismiss()}
                className={styles.toastClose}
              >
                ✖
              </button>
            </div>
          ),
        },
        {
          success: {
            duration: 3500,
          },
          error: {
            duration: 3500,
          },
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <CategoryModal
        isCategoryModalOpen={isCategoryModalOpen}
        setIsCategoryModalOpen={setIsCategoryModalOpen}
      />
      <form className={styles['add-transaction-forms']} onSubmit={submitForm}>
        <div className={styles['transaction-type__section']}>
          <MyButton
            text="Income"
            isDisabled={transactionType}
            onClick={() => {
              handleSetTransactionType('income');
            }}
          />
          <MyButton
            text="Expense"
            isDisabled={!transactionType}
            onClick={() => {
              handleSetTransactionType('expense');
            }}
          />
        </div>
        <div className={styles['transaction-card__section']}>
          <div className={styles['transaction-card__top']}>
            <div className={styles['icon__section']}>
              <CategoryIcon
                category={transactionCategory}
                type="select_icon"
                setIsModalOpen={setIsCategoryModalOpen}
              />
            </div>
            <div className={styles['amount-category__section']}>
              <div className={styles['amount-category-input__section']}>
                ${' '}
                <input
                  className={styles['transaction-amount-input']}
                  placeholder="0"
                  value={transactionAmount}
                  onChange={(e) => {
                    setTransactionAmount(Number(e.target.value));
                  }}
                ></input>
              </div>
              <div>{transactionCategory}</div>
            </div>
          </div>
          <div className={styles['transaction-card__inputs']}>
            <h2 className={styles['transaction-input-title']}>Title</h2>
            <input
              className={styles['transaction-input']}
              value={transactionTitle}
              onChange={(e) => setTransactionTitle(e.target.value)}
            />
            <h2 className={styles['transaction-input-title']}>Date</h2>
            <input
              className={styles['transaction-input']}
              value={transactionDate}
              type="date"
              onChange={(e) => setTransactionDate(e.target.value)}
            />
            <h2 className={styles['transaction-input-title']}>Payee</h2>
            <input
              className={styles['transaction-input']}
              value={transactionPayee}
              onChange={(e) => setTransactionPayee(e.target.value)}
            />
            <h2 className={styles['transaction-input-title']}>Account(s)</h2>
            <div className={styles['account-pill__section']}>
              <p>Pill 1</p> <p>Pill 2</p>
            </div>
          </div>
        </div>
        <div className={styles['button__section']}>
          <MyButton text="Add Transaction" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddTransactionWidget;
