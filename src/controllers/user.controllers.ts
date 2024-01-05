import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerForm = asyncHandler(async (req: Request, res: Response) => {
  return res.render("register");
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {});

export { registerForm, registerUser };
