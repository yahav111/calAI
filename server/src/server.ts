require("dotenv").config();
import express, { Express } from "express";
import cors from "cors";
import { aiRouter } from "./routes/aiRoutes";
const app: Express = express();
const port: Number = Number(process.env.PORT) || 3100;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"], // Allow specific HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);
app.use(express.json());

// app.use("/categories", categoriesRouter);
app.use("/ai", aiRouter);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
