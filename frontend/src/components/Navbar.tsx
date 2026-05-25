import { Link } from "react-router";
import { NavAuthData, NavData } from "../data/navData";

export const Navbar = ({ data }: { data: object | null }) => {
  return (
    <nav className="nav">
      <h2 className="nav__logo">Logo</h2>
      <ul className="nav__list">
        {data
          ? NavAuthData.map((el) => (
              <li className="list__item" key={el.link}>
                <Link to={el.link}>{el.text}</Link>
              </li>
            ))
          : NavData.map((el) => (
              <li className="list__item" key={el.link}>
                <Link to={el.link}>{el.text}</Link>
              </li>
            ))}
      </ul>
    </nav>
  );
};
