import { createClient } from '@/lib/supabase/server';
import styles from './page.module.css';
import { Nunito } from 'next/font/google';
import AddTransactionWidget from '@/app/Components/AddTransactionWidget/AddTransactionWidget';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
});

// interface Transaction {
//   date: string;
//   amount: number;
//   payee: string;
//   category: string;
// }

const AddTransaction = async () => {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error || !session) {
    redirect('/auth/login');
  }
  return (
    <div className={`${styles['page']} ${nunito.variable}`}>
      <Toaster position="top-center" />
      <h1>Add Transaction</h1>

      <AddTransactionWidget session={session} />
    </div>
  );
};

export default AddTransaction;
