import express from "express";

const router = express.Router();

let orders = [];

// GET orders
router.get("/", (req, res) => {
  res.json(orders);
});

// POST order
router.post("/", (req, res) => {
  const order = req.body;

  orders.push(order);

  res.json({
    success: true,
    order,
  });
});

export default router;