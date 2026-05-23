import { Router } from "express";
import { register, login } from "./usersController";
import {
  loginValidation,
  registerValidation,
} from "../validation/usersValidation";

export const usersRouter: Router = Router();

usersRouter.post("/register", registerValidation, register);

usersRouter.post("/login", loginValidation, login);
