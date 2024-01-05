import { registerForm, registerUser } from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import fs from "fs";

const route = Router();

route.route("/register").get(registerForm);
route.route("/register").post(upload.single("image"), registerUser);

export default route;
