import express from "express";

const router = express.Router();

let orders = [];

router.get("/", (req, res) => {
  res.json(orders);
});

router.post("/", (req, res) => {
  orders.push(req.body);
  res.json({ success: true });
});

export default router;