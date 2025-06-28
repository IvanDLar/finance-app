import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ActionMenuItem,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Transaction } from '@/app/Types/Transactions';
import { Edit, Delete } from '@mui/icons-material';


type TransactionsTableProps = {
    date: string,
    endDate: string,
    getDashboardData: Function,
    data: Transaction[];
}


export default function TransactionsTable ({date, endDate, getDashboardData, data}: TransactionsTableProps) {
  const handleDeleteTransaction = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/transactions/delete?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      await response.json();
      await getDashboardData(date, endDate);
    }
    catch(err) {
      console.log(err);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
      () => [
        {
          accessorFn: (originalRow) => originalRow.date, //access nested data with dot notation
          header: 'Date',
          size: 150,
          Cell: ({ cell }) => cell.getValue<String>().split("T")[0]
        },
        {
          accessorKey: 'amount',
          header: 'Amount',
          size: 150,
        },
        {
          accessorKey: 'payee',
          header: 'Payee',
          size: 200,
        },
        {
          accessorKey: 'category',
          header: 'Category',
          size: 150,
        }
      ],
      [],
    );

    const table = useMaterialReactTable({
      columns,
      data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
      enableGlobalFilter: false, //disable search feature
      enableRowActions: true,
      renderRowActions: ({ row, table }) => [
        <MRT_ActionMenuItem
          icon={<Delete/>}
          key="delete"
          label=""
          onClick={() => handleDeleteTransaction(row.original.id)}
          table = {table}
          />,
      ],
      initialState: { pagination: { pageSize: 5, pageIndex: 0 },
     },
      muiTableContainerProps: {
        sx: {
          '@media (max-width: 600px)': {
            overflowX: 'auto',
          },
        },
      },
      });

    return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <MaterialReactTable table={table} />
    </div>
    );
};