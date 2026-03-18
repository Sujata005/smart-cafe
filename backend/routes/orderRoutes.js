import express from "express";
import Order from "../models/Order.js";

const router = express.Router();


// GET all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
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
export default router;