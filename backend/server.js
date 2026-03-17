import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reviews", reviewRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});