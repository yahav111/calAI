import { Request, Response } from "express";
import { prismaClient } from "../server";
import { CreateUserRequest } from "../types/users/usersRequest";
import {
  generateTokensAndSetCookie,
  getValidUsername,
} from "../utils/authUtils";
import { ExtendedRequest } from "../types/users/usersRequest";
import bcrypt from "bcrypt";
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await prismaClient.user.findMany();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password }: CreateUserRequest = req.body;
  if (!username || !email) {
    res.status(400).json({ message: "Missing required fields" });
    return;
  }
  try {
    const foundUser = await prismaClient.user.findFirst({ where: { email } });
    if (foundUser) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const name = await getValidUsername(username, email);
    const ProtectedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        username: name,
        email,
        password: ProtectedPassword,
      },
    });
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ userWithoutPassword });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const { id } = req.user;
  try {
    const result = await prismaClient.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        email: true,
        username: true,
        password: false,
      },
    });
    if (!result) res.status(404).json({ message: "User not found" });
    else res.status(200).json(result);
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateUser = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const { id } = req.user;
  const { name, email, password, oldPassword } = req.body;

  try {
    if (!name && !email && !password)
      return res.status(400).json({ message: "No fields to update provided" });

    // Fetch the user's current data
    const currentUser = await prismaClient.user.findUnique({
      where: { id: Number(id) },
    });

    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    // Check if the email is already in use by another user
    if (email) {
      const existingUser = await prismaClient.user.findFirst({
        where: { email, id: { not: Number(id) } },
      });

      if (existingUser)
        return res.status(400).json({ message: "Email already in use" });
    }

    // Construct the data object dynamically
    const data: any = {};
    if (name) data.name = name;
    if (email) data.email = email;

    // Handle password update
    if (password) {
      if (!oldPassword) {
        return res
          .status(400)
          .json({ message: "Old password is required to update password" });
      }

      const isOldPasswordValid = await bcrypt.compare(
        oldPassword,
        currentUser.password
      );

      if (!isOldPasswordValid)
        return res.status(400).json({ message: "Old password is incorrect" });

      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    const updatedUser = await prismaClient.user.update({
      where: { id: Number(id) },
      data,
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser:", error);
    res.status(500).json({ message: "Server error" });
  }
};
