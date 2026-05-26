import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { usersRouter } from "./src/routes/usersRouter";
import { roomsRouter } from "./src/routes/roomsRouter";
import { errorMiddleware } from "./src/error/errorMiddleware";
import { identityMiddleware } from "./src/auth/indentityMiddleware";

export const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
app.get("/me", identityMiddleware);
app.use(errorMiddleware);
