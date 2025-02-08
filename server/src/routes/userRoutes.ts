import { RequestHandler, Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/usersController";

import { verifyJWT } from "../middlewares/verifyJWT";
export const usersRouter: Router = Router();

const middlewares = [verifyJWT as RequestHandler];

usersRouter.get("/", middlewares, getAllUsers);
usersRouter.post("/", createUser);
usersRouter.patch("/", middlewares, updateUser);
usersRouter.get("/find", middlewares, getUser);
