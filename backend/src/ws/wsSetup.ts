import { WebSocketServer, WebSocket } from "ws";
import { setupHandlers } from "./wsHandlers";

export const setupWs = (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, req) => {
    setupHandlers(ws, req);
  });
};
