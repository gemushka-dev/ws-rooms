import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";

const PORT: number = 3500;
const app = express();
const server = createServer(app);
const wss: WebSocketServer = new WebSocketServer({ server });

server.listen(PORT, () => {
  console.log(`Server works on ${PORT} port`);
});
