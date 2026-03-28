import { Router } from "express";
import { register, login } from "./usersController";

export const usersRouter: Router = Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);
