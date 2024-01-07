import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { userZodValidation } from "../zodSchema/user.zodSchema.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

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
  if (userAlready) {
    throw new ApiError("User with email or username already exists", 409, "Conflict");
  }
  let profileImageLocalPath = req.file?.path;
  if (!profileImageLocalPath) {
    throw new ApiError("Profile file is required", 400, "BadRequest");
  }
  const image = await uploadOnCloudinary(profileImageLocalPath);
  if (!image) {
    throw new ApiError("Avatar file is required", 400, "BadRequest");
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
    throw ApiError.ServerError("Something went wrong while registering user");
  }
  return res.render("register", { message: "user register successfully" });
});

export { registerForm, registerUser };
