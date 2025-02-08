import { Request } from "express";

export interface JWTUserInfo {
  id: number;
  email: string;
  name: string;
  username: string;
}
export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}
export interface ExtendedRequest extends Request {
  user?: JWTUserInfo;
  id?: number;
}
