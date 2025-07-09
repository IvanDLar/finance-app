import TransactionWidget from "../TransactionWidget/TransactionWidget";
import { Transaction } from '@/app/Types/Transactions';

type TransactionsTableProps = {
    data: Transaction[];
}


const TransactionsList = ({ data } : TransactionsTableProps) => {
    // const groupTransactionsPerDate = () => {

    // };

    return(
        <div>
            {data.map((transaction) => {
                return <TransactionWidget name={transaction.name} amount={transaction.amount} isIncome={transaction.is_income} category={transaction.category} key={transaction.id}/>
            })}
        </div>
    );
};

export default TransactionsList;