import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.ts";

if (!DB_URI) {
  throw new Error(
    "Please define the DB_URI environment variabl inside .env<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;
