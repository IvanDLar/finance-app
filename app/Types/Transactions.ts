import { Categories } from './Categories';

export type Transaction = {
  id: number;
  date: string;
  name: string;
  amount: number;
  payee: string;
  category: Categories;
  account_id: string | null;

  is_income: boolean;
};
