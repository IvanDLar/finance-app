"use client"

import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Transaction {
    date: string;
    amount: number;
    payee: string;
    category: string;
}

const submitForm = async(e: React.FormEvent<HTMLFormElement>) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) // Extract values properly
    const response = await fetch('http://localhost:3000/api/transactions/index', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
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
    <div>
      <h1>Add a Transaction</h1>
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
        {({errors, touched}) => (
          <Form onSubmit={ submitForm }>
            <label htmlFor="amount">Amount</label>
            <Field id="amount" name="amount" placeholder="35.99" type = "number" />
             {errors.amount && touched.amount ? (
               <div>{errors.amount}</div>
             ) : null}

            <label htmlFor="payee">Payee</label>
            <Field id="payee" name="payee" placeholder="Ivan Diaz" />
            {errors.payee && touched.payee ? (
               <div>{errors.payee}</div>
             ) : null}

            <label htmlFor="category">Category</label>
            <Field id="category" name="category" placeholder="Gaming" />
            {errors.category && touched.category ? (
               <div>{errors.category}</div>
             ) : null}

            <label htmlFor="date">Date</label>
            <Field id="date" name="date" placeholder="2024-05-10" type = "date" />
            {errors.date && touched.date ? (
               <div>{errors.date}</div>
             ) : null}

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );

export default AddTransaction;