"use client";

import "./login-form.css";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const ROUTE_HOME = "/routes/home";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-card">
        <h2 className="login-title">Coinleaf</h2>
        <p className="login-description">
          To login into coinleaf you'll need to input your email and password.
        </p>

        <label htmlFor="email" className="login-label">Email</label>
        <input
          id="email"
          type="email"
          className="login-input"
          placeholder="m@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="login-label">Password</label>
        <input
          id="password"
          type="password"
          className="login-input"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="/auth/forgot-password" className="login-link">
          Forgot your password?
        </Link>
        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="login-footer">
          Don&apos;t have an account?{" "}
          <Link href="/auth/sign-up">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
