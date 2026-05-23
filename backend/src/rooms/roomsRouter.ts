import { Router } from "express";
import { createRoomController } from "./roomsController";

export const roomsRouter: Router = Router();

roomsRouter.post("/create", createRoomController);
