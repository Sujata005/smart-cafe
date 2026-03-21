import express from "express";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
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

    const savedOrder = await order.save();

    // ===== LOYALTY =====

    let customer = await Customer.findOne({
      phone: req.body.phone,
    });

    if (!customer) {

      customer = new Customer({
        phone: req.body.phone,
        name: req.body.customerName,
        ordersCount: 0,
      });

    }

    customer.ordersCount += 1;

    await customer.save();

    let reward = null;

    if (customer.ordersCount === 5)
      reward = "Free Drink ☕";

    if (customer.ordersCount === 10)
      reward = "Free Dessert 🍰";

    if (customer.ordersCount === 15)
      reward = "Free Meal 🍝";

    res.json({
      order: savedOrder,
      reward,
      count: customer.ordersCount,
    });

  } catch (err) {

    res.status(500).json({
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