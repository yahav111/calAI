import { Router } from "express";
import { login, logout } from "../controllers/authController";
export const authRouter: Router = Router();

authRouter.post("/logout", logout);
authRouter.post("/login", login);
