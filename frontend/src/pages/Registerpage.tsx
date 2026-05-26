import { useRef } from "react";
import { createRegisterHandler } from "../handlers/registerHandler";
import styles from "../style/register.module.css";
import { Link } from "react-router";

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
      <section className={styles.register__section}>
        <h1 className={styles.register__title}>Register</h1>
        <form className={styles.register__form} onSubmit={registerHandler}>
          <input
            className={styles.form__input}
            type="text"
            placeholder="username"
            max={8}
            ref={usernameRef}
            required
          />
          <input
            className={styles.form__input}
            type="email"
            placeholder="example@gmail.com"
            ref={emailRef}
            required
          />
          <input
            className={styles.form__input}
            type="password"
            placeholder="password"
            min={8}
            ref={passwordRef}
            required
          />

          <button className={styles.form__button}>Register</button>
        </form>
        <div className="info">
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </section>
    </>
  );
};
