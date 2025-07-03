"use client"

import { User } from "@supabase/supabase-js";
import { useContext, createContext } from "react";

export const UserContext = createContext<User | null>(null);
export const useUser = () => useContext(UserContext);