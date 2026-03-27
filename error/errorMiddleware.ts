import { ZodError } from "zod";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "./HttpError";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Validation Error", errors: err.issues });
  }
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
