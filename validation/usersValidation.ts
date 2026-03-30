import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .max(64, { message: "Username may be at max 64 characters long" }),
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = registerSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (e) {
    next(e);
  }
};

export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validated = loginSchema.parse(req.body);
    req.body = validated;
    next();
  } catch (e) {
    next(e);
  }
};
