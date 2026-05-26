import { Link } from "react-router";
import { NavAuthData, NavData } from "../data/navData";
import styles from "../style/navbar.module.css";

export const Navbar = ({ data }: { data: object | null }) => {
  console.log(data);
  return (
    <nav className={styles.nav}>
      <h2 className={styles.nav__logo}>Logo</h2>
      <ul className={styles.nav__list}>
        {data
          ? NavAuthData.map((el) => (
              <li className={styles.list__item} key={el.link}>
                <Link to={el.link}>{el.text}</Link>
              </li>
            ))
          : NavData.map((el) => (
              <li className={styles.list__item} key={el.link}>
                <Link to={el.link}>{el.text}</Link>
              </li>
            ))}
      </ul>
    </nav>
  );
};
