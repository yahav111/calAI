import { Router } from "express";
import { getAiTest, PostAiTest } from "../controllers/aiController";
export const aiRouter: Router = Router();
aiRouter.get("/", getAiTest);
aiRouter.post("/", PostAiTest);
