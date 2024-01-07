import { loadDashboard, loadLogin, logOut, login, registerForm, registerUser } from "../controllers/user.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { userLoginZodValidation, userRegisterZodValidation } from "../zodSchema/user.zodSchema.js";
import zodValidate from "../middlewares/zodValidation.middleware.js";

const route = Router();

route.route("/").get(loadLogin);
route.route("/").post(zodValidate(userLoginZodValidation), login);
route.route("/logout").get(logOut);
route.route("/dashboard").get(loadDashboard);

route.route("/register").get(registerForm);
route.route("/register").post(upload.single("image"), zodValidate(userRegisterZodValidation), registerUser);

route.route("*").get((req, res) => {
  res.redirect("/");
});

export default route;
