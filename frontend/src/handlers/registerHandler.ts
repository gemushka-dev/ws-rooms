import type { FormEvent } from "react";
import type { User } from "../type/UserType";

export const createRegisterHandler = (user: User) => {
  return async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username: user.usernameRef.current?.value,
      email: user.emailRef.current?.value,
      password: user.passwordRef.current?.value,
    };

    const response = await fetch("http://localhost:3500/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response);
      return alert("Something went wrong");
    }
    alert("Successfully registration");
    user.usernameRef.current!.value = "";
    user.emailRef.current!.value = "";
    user.passwordRef.current!.value = "";
  };
};
