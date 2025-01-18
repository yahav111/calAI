import { Router } from "express";
import { getAiTest } from "../controllers/aiController";
export const aiRouter: Router = Router();
aiRouter.get("/", getAiTest);
