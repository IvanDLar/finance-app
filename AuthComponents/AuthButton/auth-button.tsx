"use client";

import MyButton from "@/app/Components/Button/Button";

export function AuthButton() {
  return (
    <div className="authentication">
      <MyButton text="Sign in" url="/" size="small">
      </MyButton>
      <MyButton text="Sign up" url="/auth/sign-up" size="small" variant="outlined-button">
      </MyButton>
    </div>
  );
}
