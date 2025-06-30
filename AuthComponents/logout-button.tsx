"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/AuthComponents/ui/button";
import { useRouter } from "next/navigation";
import MyButton from "@/app/Components/Button/Button";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };

  return <MyButton text="Logout" size="small" onClick={logout}/>;
}
