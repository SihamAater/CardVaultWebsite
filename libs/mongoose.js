import mongoose from "mongoose";
import User from "@/models/User";

const connectMongo = async () => {
  // Use local MongoDB for development, Atlas for production
  const mongoUri = process.env.NODE_ENV === "development"
    ? process.env.MONGODB_URI_LOCAL || "mongodb://localhost:27017/cardvault"
    : process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "Add the MONGODB_URI environment variable inside .env.local to use mongoose"
    );
  }

  return mongoose
    .connect(mongoUri)
    .catch((e) => console.error("Mongoose Client Error: " + e.message));
};

export default connectMongo;
