"use client"

import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import styles from './page.module.css';
import _ from 'underscore';
import MyButton from '../Components/Button/Button';

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
              <label className={styles["form-label"]} htmlFor="amount">Amount</label>
              <Field className={`${styles["form-input"]} ${(errors.amount && touched.amount) && styles["form-input-error"]}`} id="amount" name="amount" placeholder="35.99" type = "number" />
              {(errors.amount && touched.amount) &&  (
                <div className={styles["form-error"]}>{errors.amount}</div>
              )}
             </div>

            <div className={styles["form-element"]}>
              <label className={styles["form-label"]} htmlFor="payee">Payee</label>
              <Field className={`${styles["form-input"]} ${(errors.payee && touched.payee) && styles["form-input-error"]}`} id="payee" name="payee" placeholder="Ivan Diaz" />
              {(errors.payee && touched.payee) &&  (
                <div className={styles["form-error"]}>{errors.payee}</div>
              )}
             </div>
            <div className={styles["form-element"]}>
              <label className={styles["form-label"]} htmlFor="category">Category</label>
              <Field className={`${styles["form-input"]} ${(errors.category && touched.category) && styles["form-input-error"]}`} id="category" name="category" placeholder="Gaming" />
              {(errors.category && touched.category) &&  (
                <div className={styles["form-error"]}>{errors.category}</div>
              )}
             </div>
            <div className={styles["form-element"]}>
              <label className={styles["form-label"]} htmlFor="date">Date</label>
              <Field className={`${styles["form-input"]} ${(errors.date && touched.date) && styles["form-input-error"]}`} id="date" name="date" placeholder="2024-05-10" type = "date" />
              {(errors.date && touched.date) && (
                <div className={styles["form-error"]}>{errors.date}</div>
              )}
             </div>
             <div className={styles["form-button"]}>
              <MyButton text = "Submit" type="submit" isDisabled={!(isValid && dirty)}/>
             </div>
            {/* <button className={styles["form-button"]} type="submit" disabled={!(isValid && dirty)}>Submit</button> */}
            <Toaster />
          </Form>
        )}
      </Formik>
    </div>
  );

export default AddTransaction;