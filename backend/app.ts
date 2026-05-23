import express from "express";
import cookieParser from "cookie-parser";
import { usersRouter } from "./src/routes/usersRouter";
import { roomsRouter } from "./src/rooms/roomsRouter";
import { errorMiddleware } from "./src/error/errorMiddleware";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
app.use(errorMiddleware);
