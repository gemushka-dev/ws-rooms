import { Route, Routes } from "react-router";
import { Homepage } from "./pages/Homepage";
import { Loginpage } from "./pages/Loginpage";
import { Registerpage } from "./pages/Registerpage";
import "./style/main.css";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import { Room } from "./pages/Room";
import { Chat } from "./pages/Chat";

export const App = () => {
  const { data } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout data={data} />}>
          <Route path="/" element={<Homepage />} />
          {data ? (
            <>
              <Route path="/room" element={<Room />} />
              <Route path="/room/:id" element={<Chat />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<Registerpage />} />
            </>
          )}
        </Route>
      </Routes>
    </>
  );
};
