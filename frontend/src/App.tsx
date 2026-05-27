import { Route, Routes } from "react-router";
import { Homepage } from "./pages/Homepage";
import { Loginpage } from "./pages/Loginpage";
import { Registerpage } from "./pages/Registerpage";
import "./style/main.css";
import { Layout } from "./components/Layout";
import { useAuth } from "./hooks/useAuth";
import { Room } from "./pages/Room";
import { Chat } from "./pages/Chat";
import { useRef } from "react";
import { createConnectWebSocket } from "./handlers/connectHandler";

export const App = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const { data } = useAuth();
  const connectWebSocket = createConnectWebSocket(socketRef);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout data={data} />}>
          <Route path="/" element={<Homepage />} />
          {data ? (
            <>
              <Route
                path="/room"
                element={<Room connectWebSocket={connectWebSocket} />}
              />
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
