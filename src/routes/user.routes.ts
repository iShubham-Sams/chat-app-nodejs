import { registerForm, registerUser } from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import fs from "fs";
import { userZodValidation } from "../zodSchema/user.zodSchema.js";
import zodValidate from "../middlewares/zodValidation.middleware.js";

const route = Router();

route.route("/register").get(registerForm);
route.route("/register").post(upload.single("image"), zodValidate(userZodValidation), registerUser);

export default route;
