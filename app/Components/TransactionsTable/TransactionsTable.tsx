import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

type Transaction = {
    date: string;
    amount: number;
    payee: string;
    category: string;
}

type TransactionsTableProps = {
    data: Transaction[];
}


export default function TransactionsTable ({data}: TransactionsTableProps) {
    const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
        () => [
          {
            accessorKey: 'date', //access nested data with dot notation
            header: 'Date',
            size: 150,
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
        initialState: { pagination: { pageSize: 5, pageIndex: 0 } },
        });

      return <MaterialReactTable table={table} />;
};