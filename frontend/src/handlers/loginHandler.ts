import type { FormEvent } from "react";
import type { UserLoginType } from "../type/UserType";

export const createLoginHandler = (user: UserLoginType) => {
  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: user.emailRef.current?.value,
      password: user.passwordRef.current?.value,
    };
    const response = await fetch("http://localhost:3500/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response);
      return alert("Something went wrong");
    }
    alert("Logged in");
  };
};
