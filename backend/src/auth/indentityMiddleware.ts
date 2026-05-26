import { Request, Response, NextFunction } from "express";
import { HttpError } from "../error/HttpError";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

export const identityMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookie = req.cookies.access_token;
    if (!cookie) {
      throw new HttpError("Not Authenticated", 401);
    }
    const payload = verify(cookie, String(process.env.JWT_SECRET)) as {
      userId: number;
      username: string;
    };
    res.status(200).json(payload);
  } catch (e) {
    next(e);
  }
};
