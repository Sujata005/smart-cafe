import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashed = await bcrypt.hash("admin123", 10);

await Admin.create({
  username: "admin",
  password: hashed
});

console.log("Admin created");

process.exit();