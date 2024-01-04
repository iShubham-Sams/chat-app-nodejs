import { DB_NAME } from "../constant.js";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log(`mongodb connect !! DB HOST:${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error while connecting database", error);
    process.exit(1);
  }
};
export default connectDB;
