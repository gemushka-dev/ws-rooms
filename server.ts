import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { database } from "./database/init";

const PORT: number = 3500;
const app = express();
const server = createServer(app);
const wss: WebSocketServer = new WebSocketServer({ server });

async function start() {
  try {
    await database.init();
    server.listen(PORT, () => {
      console.log(`Server works on ${PORT} port`);
    });
  } catch (e: unknown) {
    console.log(
      `Something went wrong.Error:${e instanceof Error ? e.message : e}`,
    );
    process.exit(1);
  }
}

start();
