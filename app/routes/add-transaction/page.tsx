import { createClient } from "@/lib/supabase/server";
import styles from './page.module.css';
import _ from 'underscore';
import { Geist } from "next/font/google";
import AddTransactionWidget from '@/app/Components/AddTransactionWidget/AddTransactionWidget';
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

interface Transaction {
    date: string;
    amount: number;
    payee: string;
    category: string;
}


const AddTransaction = async () => {

  const supabase = await createClient();

  const { data: { session}, error } = await supabase.auth.getSession();
  if (error || !session) {
    redirect("/auth/login");
  }
  return (
    <div className={`${styles["page"]} ${geistSans.variable}`}>
      <h1>
        Add Transaction
      </h1>
      <AddTransactionWidget session={session}/>
    </div>

  )
  // return (
  //   <div className={styles["add-transaction-page"]}>
  //     <h1 className={styles["page-title"]}>Add a Transaction</h1>
  //     <Formik
  //       initialValues={{
  //           date: "",
  //           amount: 0,
  //           payee: "",
  //           category: ""
  //       }}
  //       validationSchema={TransactionSchema}
  //       onSubmit={(values: Transaction, { setSubmitting }: FormikHelpers<Transaction>) => {
  //         setTimeout(() => {
  //           alert(JSON.stringify(values, null, 2));
  //           setSubmitting(false);
  //         }, 500);
  //       }}
  //     >
  //       {({errors, touched, isValid, dirty}) => (
  //         <Form className={styles["form"]} onSubmit={ submitForm }>
  //            <div className={styles["form-element"]}>
  //             <label className={styles["form-label"]} htmlFor="amount">Amount</label>
  //             <Field className={`${styles["form-input"]} ${(errors.amount && touched.amount) && styles["form-input-error"]}`} id="amount" name="amount" placeholder="35.99" type = "number" />
  //             {(errors.amount && touched.amount) &&  (
  //               <div className={styles["form-error"]}>{errors.amount}</div>
  //             )}
  //            </div>

  //           <div className={styles["form-element"]}>
  //             <label className={styles["form-label"]} htmlFor="payee">Payee</label>
  //             <Field className={`${styles["form-input"]} ${(errors.payee && touched.payee) && styles["form-input-error"]}`} id="payee" name="payee" placeholder="Ivan Diaz" />
  //             {(errors.payee && touched.payee) &&  (
  //               <div className={styles["form-error"]}>{errors.payee}</div>
  //             )}
  //            </div>
  //           <div className={styles["form-element"]}>
  //             <label className={styles["form-label"]} htmlFor="category">Category</label>
  //             <Field className={`${styles["form-input"]} ${(errors.category && touched.category) && styles["form-input-error"]}`} id="category" name="category" placeholder="Gaming" />
  //             {(errors.category && touched.category) &&  (
  //               <div className={styles["form-error"]}>{errors.category}</div>
  //             )}
  //            </div>
  //           <div className={styles["form-element"]}>
  //             <label className={styles["form-label"]} htmlFor="date">Date</label>
  //             <Field className={`${styles["form-input"]} ${(errors.date && touched.date) && styles["form-input-error"]}`} id="date" name="date" placeholder="2024-05-10" type = "date" />
  //             {(errors.date && touched.date) && (
  //               <div className={styles["form-error"]}>{errors.date}</div>
  //             )}
  //            </div>
  //            <div className={styles["form-button"]}>
  //             <MyButton text = "Submit" type="submit" isDisabled={!(isValid && dirty)}/>
  //            </div>
  //           <Toaster />
  //         </Form>
  //       )}
  //     </Formik>
  //   </div>
  // )
};

export default AddTransaction;