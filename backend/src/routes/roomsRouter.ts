import { Router } from "express";
import { createRoomController } from "../controllers/roomsController";

export const roomsRouter: Router = Router();

roomsRouter.post("/create", createRoomController);
