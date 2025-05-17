"use client"

import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import styles from './page.module.css';
import _ from 'underscore';

interface Transaction {
    date: string;
    amount: number;
    payee: string;
    category: string;
}


const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) // Extract values properly
    toast.promise(
      async () => {
        const response = await fetch('http://localhost:3000/api/transactions/index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
        return data;
      },
      {
        loading: 'Loading...',
        success: 'Successfully added your transaction!',
        error: (err) => err.message || 'Error while adding the transaction!',
      }
    );
  }
  catch(err) {
    console.log(err);
  }
};

const TransactionSchema = Yup.object().shape({
    date: Yup.date()
      .required('Required'),
    amount: Yup.number()
        .required('Required'),
    payee: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    category: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
  });

const AddTransaction = () => (
    <div className={styles["add-transaction-page"]}>
      <h1 className={styles["page-title"]}>Add a Transaction</h1>
      <Formik
        initialValues={{
            date: "",
            amount: 0,
            payee: "",
            category: ""
        }}
        validationSchema={TransactionSchema}
        onSubmit={(values: Transaction, { setSubmitting }: FormikHelpers<Transaction>) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {({errors, touched, isValid, dirty}) => (
          <Form className={styles["form"]} onSubmit={ submitForm }>
             <div className={styles["form-element"]}>
              <label htmlFor="amount">Amount</label>
              <Field id="amount" name="amount" placeholder="35.99" type = "number" />
              {errors.amount && touched.amount ? (
                <div>{errors.amount}</div>
              ) : null}
             </div>

            <div className={styles["form-element"]}>
              <label htmlFor="payee">Payee</label>
              <Field id="payee" name="payee" placeholder="Ivan Diaz" />
              {errors.payee && touched.payee ? (
                <div>{errors.payee}</div>
              ) : null}
             </div>
            <div className={styles["form-element"]}>
              <label htmlFor="category">Category</label>
              <Field id="category" name="category" placeholder="Gaming" />
              {errors.category && touched.category ? (
                <div>{errors.category}</div>
              ) : null}
             </div>
            <div className={styles["form-element"]}>
              <label htmlFor="date">Date</label>
              <Field id="date" name="date" placeholder="2024-05-10" type = "date" />
              {errors.date && touched.date ? (
                <div>{errors.date}</div>
              ) : null}
             </div>
            <button className={styles["form-button"]} type="submit" disabled={!(isValid && dirty)}>Submit</button>
            <Toaster />
          </Form>
        )}
      </Formik>
    </div>
  );

export default AddTransaction;