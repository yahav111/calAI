import { Router } from "express";
import { getAiTest } from "../controllers/aiController";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `image-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single("image");

export const aiRouter: Router = Router();

aiRouter.post(
  "/",
  (req, res, next) => {
    console.log("Received request");
    console.log("Headers:", req.headers);

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        return res.status(400).json({
          success: false,
          error: `Upload error: ${err.message}`,
        });
      } else if (err) {
        console.error("Other error:", err);
        return res.status(500).json({
          success: false,
          error: `Server error: ${err.message}`,
        });
      }

      console.log("File uploaded:", req.file);
      next();
    });
  },
  getAiTest
);
