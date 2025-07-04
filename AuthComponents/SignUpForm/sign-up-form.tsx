"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./sign-up-form.css"

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignUp} className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <p className="signup-description">Create a new account</p>
        <label htmlFor="email" className="signup-label">Email</label>
        <input
          id="email"
          type="email"
          className="signup-input"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="signup-label">Password</label>
        <input
          id="password"
          type="password"
          className="signup-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="repeat-password" className="signup-label">Repeat Password</label>
        <input
          id="repeat-password"
          type="password"
          className="signup-input"
          required
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
          {error && <p className="signup-error">{error}</p>}
          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Creating an account..." : "Sign up"}
          </button>
        <div className="signup-footer">
          Already have an account?{" "}
          <Link href="/auth/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
