import { useNavigate } from "react-router";

export const createConnectWebSocket = (
  socketRef: React.RefObject<WebSocket | null>,
) => {
  const navigate = useNavigate();
  return (roomId: number) => {
    const ws = new WebSocket("ws://localhost:3500");
    socketRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "JOIN", roomId }));
    };
    ws.onmessage = (e: any) => {
      const data = JSON.parse(e.data);
      if (data.message === "JOINED") {
        navigate(`/room/${roomId}`);
      }
    };
    ws.onerror = () => {
      alert("Connection error");
    };
  };
};
