"use client"

import BudgetDashboard from "./Components/BudgetDashboard/BudgetDashboard";
import data from "../Database/transactions.json";

export default function Home() {
  return (
    <>
      <BudgetDashboard transactions={data}/>
    </>
  );
}
