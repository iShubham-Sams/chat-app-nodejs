import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userZodValidation } from "../zodSchema/user.zodSchema.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import HttpStatusCode from "../utils/statusCode.js";

const registerForm = asyncHandler(async (req: Request, res: Response) => {
  return res.render("register");
});

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const {
    body: { email, name, password },
  } = await userZodValidation.parseAsync(req);
  let userAlready = await User.findOne({
    $or: [{ email, name }],
  });
  let profileImageLocalPath = req.file?.path;
  if (!profileImageLocalPath) {
    return res.status(HttpStatusCode.BAD_REQUEST).render("register", { message: "profile file are required", type: "error" });
  }
  if (userAlready) {
    fs.unlinkSync(profileImageLocalPath);
    return res.status(HttpStatusCode.CONFLICT).render("register", { message: "user with this email or name already exist", type: "error" });
  }
  const image = await uploadOnCloudinary(profileImageLocalPath);

  if (!image) {
    return res.status(HttpStatusCode.BAD_REQUEST).render("register", { message: "profile file are required", type: "error" });
  }
  const user = await User.create({
    name: name.toLowerCase(),
    email: email,
    image: image.url,
    password: password,
    is_online: "0",
  });

  const userCreateDone = await User.findById(user._id).select("-password -refreshToken ");
  if (!userCreateDone) {
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).render("register", { message: "Something went wrong while registering user", type: "error" });
  }
  return res.status(HttpStatusCode.OK).render("register", { message: "user register successfully", type: "success" });
});

const loadLogin = asyncHandler(async (req: Request, res: Response) => {
  res.render("login");
});

const login = asyncHandler(async (req: Request, res: Response) => {});

const logOut = asyncHandler(async (req: Request, res: Response) => {});

const loadDashboard = asyncHandler(async (req: Request, res: Response) => {});

export { registerForm, registerUser, loadLogin, login, logOut, loadDashboard };
