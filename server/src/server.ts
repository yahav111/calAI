require("dotenv").config();
import express, { Express } from "express";
import cors from "cors";
import { aiRouter } from "./routes/aiRoutes";
import { authRouter } from "./routes/authRoutes";
import { PrismaClient } from "@prisma/client";
import { usersRouter } from "./routes/userRoutes";
const app: Express = express();
const port: Number = Number(process.env.PORT) || 3100;

export const prismaClient = new PrismaClient({ log: ["query"] });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/ai", aiRouter);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
