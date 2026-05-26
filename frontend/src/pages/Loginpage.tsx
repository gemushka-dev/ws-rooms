import { useRef } from "react";
import { Link } from "react-router";
import { createLoginHandler } from "../handlers/loginHandler";
import styles from "../style/register.module.css";

export const Loginpage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const loginHandler = createLoginHandler({ emailRef, passwordRef });
  return (
    <>
      <section className={styles.register__section}>
        <h1 className={styles.register__title}>Login</h1>
        <form onSubmit={loginHandler} className={styles.register__form}>
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
          <button className={styles.form__button}>Login</button>
        </form>
        <div>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </div>
      </section>
    </>
  );
};
