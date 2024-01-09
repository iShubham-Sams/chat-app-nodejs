import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";
config({
  path: "./.env",
});

const SESSION_SECRET = process.env.SESSION_SECRET ?? "this";

var corsOptions = {
  origin: process.env.CORS_PRIGIN,
  credential: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(session({ secret: SESSION_SECRET }));

app.set("view engine", "ejs");
app.set("views", "./src/views");

import userRoute from "./routes/user.routes.js";
app.use("/api/v1", userRoute);

app.use("*", (req, res) => {
  res.send("not found");
});

export { app };
