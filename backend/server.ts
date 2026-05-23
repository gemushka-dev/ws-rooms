import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { database } from "./src/database/init";
import { usersRouter } from "./src/users/usersRouter";
import { errorMiddleware } from "./src/error/errorMiddleware";
import cookieParser from "cookie-parser";
import { roomsRouter } from "./src/rooms/roomsRouter";
import { setupWs } from "./src/ws/wsSetup";

const PORT: number = 3500;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
app.use(errorMiddleware);

const server = createServer(app);
setupWs(server);

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
