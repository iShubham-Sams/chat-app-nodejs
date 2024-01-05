import { registerForm, registerUser } from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";

const route = Router();

route.get("/register", registerForm);
route.post("/register", upload.single("image"), registerUser);

export default route;
