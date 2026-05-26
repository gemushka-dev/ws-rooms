import { useRef } from "react";
import { createRegisterHandler } from "../handlers/RegisterHandler";

export const Registerpage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const registerHandler = createRegisterHandler({
    usernameRef,
    emailRef,
    passwordRef,
  });
  return (
    <>
      <section className="register__section">
        <form className="register__form" onSubmit={registerHandler}>
          <input
            className="form__input"
            type="text"
            placeholder="username"
            max={8}
            ref={usernameRef}
            required
          />
          <input
            className="form__input"
            type="email"
            placeholder="example@gmail.com"
            ref={emailRef}
            required
          />
          <input
            className="form__input"
            type="password"
            placeholder="password"
            min={8}
            ref={passwordRef}
            required
          />

          <button>Register</button>
        </form>
      </section>
    </>
  );
};
