import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "./usersService";

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
    if (e instanceof Error) {
      switch (e.message) {
        case "User already exists":
          res.status(409).json({ message: e.message });
          break;
        default:
          res.status(400).json({ message: "Internal Server Error" });
      }
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
    if (e instanceof Error) {
      switch (e.message) {
        case "Unauthorized":
          res.status(401).json({ message: e.message });
          break;
        case "Invalid user data":
          res.status(400).json({ message: e.message });
          break;
        case "Incorrect Credentials":
          res.status(401).json({ message: e.message });
          break;
        default:
          res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};
