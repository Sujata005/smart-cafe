import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
console.log("LOGIN TRY:", username, password);
    const admin = await Admin.findOne({ username });
console.log("FOUND ADMIN:", admin);
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, admin.password);
console.log("PASSWORD MATCH:", valid);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: admin._id, username: admin.username } });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;