"use strict"

import { useState, useEffect } from 'react';
import { Transaction } from '@/app/Types/Transactions';
import { ArrowBackIos, ArrowForwardIos, Delete } from "@mui/icons-material";
import styles from "./TransactionTableVanilla.module.css";


type TransactionsTableProps = {
    date: string,
    endDate: string,
    getDashboardData: Function,
    data: Transaction[];
}

const TransactionVanillaTable = ({date, endDate, getDashboardData, data}: TransactionsTableProps) => {
    const [currPage, setCurrPage] = useState(0);
    const [availablePages, setAvailablePages] = useState(0);
    const [isArrowDisabled, setIsArrowDisabled] = useState({"left": true, "right": false});
    const [currData, setCurrData] = useState<Transaction[]>([]);

    const handlePagination = () => {
        // Ceil to have the amount of pages
        const availablePages = Math.ceil(data?.length / 5) - 1;
        const startIndex = currPage * 5;
        const endIndex = data[startIndex + 5] ? startIndex + 5 : data?.length;
        const currentPageData = data?.slice(startIndex, endIndex);

        if (currPage === 0) setIsArrowDisabled({"left": true, "right":false });
        if (currPage === availablePages) setIsArrowDisabled({"left": false, "right": true });
        if (currPage !== 0 && currPage !== availablePages) setIsArrowDisabled({ "left": false, "right": false });


        setAvailablePages(availablePages);
        setCurrData(currentPageData);
    };

    const handleNextPage = () => {
        if (currPage === availablePages || availablePages === -1) return;
        setCurrPage(currPage + 1);
    };

    const handlePrevPage = () => {
        if (currPage === 0 || availablePages === -1) return;
        setCurrPage(currPage - 1);
    }

    const handleDeleteTransaction = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/transactions/delete?id=${id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                }
            });
            await response.json();
            await getDashboardData(date, endDate);
        }
        catch(err) {
            console.log(err);
        }
    };

    const handleResetPage = () => {
        setCurrPage(0);
    };

    useEffect(() => {
        handlePagination();
    }, [data, currPage]);

    useEffect(() => {
        handleResetPage();
    }, [date])

    return(
        <>
        <table>
            <thead>
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Payee</th>
                <th>Category</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {currData.map(transaction => {
                    return (
                        <tr key={transaction.id}>
                            <td>{transaction.date.split("T")[0]}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.payee}</td>
                            <td onClick={() => handleDeleteTransaction(transaction.id)} className={styles.delete_transaction}>{<Delete/>}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <div className={styles.pages_section}>
            <a className={`${styles["change-date-arrows"]} ${styles["left-arrow"]} ${isArrowDisabled.left && styles.disabled}`}
                    onClick={handlePrevPage}>
                    <ArrowBackIos/>
            </a>
            <p>Page: {currPage + 1}</p>
            <a className={`${styles["change-date-arrows"]} ${styles["right-arrow"]} ${isArrowDisabled.right && styles.disabled}`}
                    onClick={handleNextPage}>
                    <ArrowForwardIos/>
            </a>
        </div>
        </>
    );
};

export default TransactionVanillaTable;