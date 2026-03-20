import express from "express";
import Order from "../models/Order.js";

const router = express.Router();


// GET all orders
router.get("/", async (req, res) => {

  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );

  const orders = await Order.find({
    status: { $ne: "Delivered" }
  }).sort({ createdAt: -1 });

  res.json(orders);

});


// CREATE order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);

    const saved = await order.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

// UPDATE order status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.patch("/:id", async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    );

    res.json(order);

  } catch (err) {

    res.status(500).json({
      error: "Update failed"
    });

  }

});
export default router;