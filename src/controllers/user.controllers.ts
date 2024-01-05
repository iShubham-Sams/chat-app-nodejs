import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler.js";

export const registerForm = asyncHandler(async (req: Request, res: Response) => {
  res.render("register");
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {});
