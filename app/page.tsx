"use client"

import BudgetDashboard from "./Components/BudgetDashboard/BudgetDashboard";
import Navbar from "./Components/Navbar/Navbar";

export default function Home() {
  return (
      <>
        <Navbar/>
        <BudgetDashboard />
      </>
  );
}
