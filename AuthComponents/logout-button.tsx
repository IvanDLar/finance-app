"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/AuthComponents/ui/button";
import { useRouter } from "next/navigation";
import MyButton from "@/app/Components/Button/Button";

export function LogoutButton({ size } : any) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login")
    router.refresh();
  };

  return <MyButton text="Logout" size={size} onClick={logout}/>;
}
