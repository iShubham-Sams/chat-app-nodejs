import connectDB from "./db/index.js";
import { app } from "./app.js";
import { config } from "dotenv";
config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      throw err;
    });
    app.listen(process.env.PORT ?? 8000, () => {
      console.log(`Server is running at port:http://127.0.0.1:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !!!", err);
  });
