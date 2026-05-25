import { Link, Route, Routes } from "react-router";
import { Homepage } from "./pages/Homepage";
import { Loginpage } from "./pages/Loginpage";
import { Registerpage } from "./pages/Registerpage";

export const App = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
    </>
  );
};
