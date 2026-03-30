import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { database } from "./database/init";
import { usersRouter } from "./users/usersRouter";
import { errorMiddleware } from "./error/errorMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT: number = 3500;

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true,
  }),
);
app.use(express.json());
app.use("/users", usersRouter);
app.use(errorMiddleware);

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
