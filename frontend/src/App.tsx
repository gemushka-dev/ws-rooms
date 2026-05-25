import { Route, Routes } from "react-router";
import { Homepage } from "./pages/Homepage";
import { Loginpage } from "./pages/Loginpage";
import { Registerpage } from "./pages/Registerpage";
import "./style/main.css";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout data={null} />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Route>
      </Routes>
    </>
  );
};
