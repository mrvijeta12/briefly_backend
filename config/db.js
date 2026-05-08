import mongoose from "mongoose";
import "dotenv/config";

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connection;
