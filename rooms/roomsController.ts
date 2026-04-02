import { createRoom } from "./roomsService";
import { Request, Response, NextFunction } from "express";

export const createRoomController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const room = createRoom();
    res.status(201).json({ roomId: room.id });
  } catch (e) {
    next(e);
  }
};
