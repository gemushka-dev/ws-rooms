import { WebSocketServer, WebSocket } from "ws";
import { roomGateway } from "./ws.gateway";

export const setupWs = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, req) => {
    roomGateway.handleConnection(ws, req);
  });
};
