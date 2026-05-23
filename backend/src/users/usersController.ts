import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./usersService";
import { HttpError } from "../error/HttpError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const data = await registerUser(body.username, body.email, body.password);
    res.status(201).json(data);
  } catch (e: unknown) {
    if (e instanceof HttpError) {
      next(e);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body = req.body;
    const data = await loginUser(body.email, body.password);
    res.cookie("access_token", data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ userId: data.userId, username: data.username });
  } catch (e: unknown) {
    if (e instanceof HttpError) {
      next(e);
    }
  }
};
