import BudgetDashboard from "./Components/BudgetDashboard/BudgetDashboard";
import { EnvVarWarning } from "@/AuthComponents/env-var-warning";
import { AuthButton } from "@/AuthComponents/auth-button";
import { ConnectSupabaseSteps } from "@/AuthComponents/tutorial/connect-supabase-steps";
import { SignUpUserSteps } from "@/AuthComponents/tutorial/sign-up-user-steps";

import { hasEnvVars } from "@/lib/utils";

export default function Login() {
  return (
      <main className="min-h-screen flex flex-col items-center">
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </nav>
          <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
            <main className="flex-1 flex flex-col gap-6 px-4">
              {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />}
            </main>
          </div>
        </div>
      </main>
        // <BudgetDashboard />
  );
}
