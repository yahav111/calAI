import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ExtendedRequest } from "../types/users/usersRequest";

export const verifyJWT = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies?.access_token || req.headers?.authorization;
    console.log("token", req.headers);

    if (!token) return res.status(401).json({ message: "Unauthorized JWT" });

    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res.status(500).json({
        message: "Internal Server Error: Missing access token secret",
      });
    }

    jwt.verify(token, secret, (err: any, decoded: any) => {
      req.user = decoded.UserInfo;
    });
    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
