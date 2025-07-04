import BudgetDashboard from "./Components/BudgetDashboard/BudgetDashboard";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: { session}, error } = await supabase.auth.getSession();
  if (error || !session) {
    redirect("/auth/login");
  }
  return (
      <main>
          <BudgetDashboard session={session}/>
      </main>
  );
}
