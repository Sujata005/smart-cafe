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
  const { items, total, customerName, phone } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order must include at least one item." });
  }

  if (!customerName || customerName.trim().length < 2) {
    return res.status(400).json({ message: "customerName must be at least 2 characters." });
  }

  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ message: "phone must be a 10 digit number." });
  }

  if (typeof total !== 'number' || total <= 0) {
    return res.status(400).json({ message: "total must be a positive number." });
  }

  try {

    const order = new Order(req.body);
    const savedOrder = await order.save();

    // ===== LOYALTY PREMIUM =====

    let customer = await Customer.findOne({
      phone: req.body.phone,
    });

    if (!customer) {

      customer = new Customer({
        phone: req.body.phone,
        name: req.body.customerName,
      });

    }

    customer.ordersCount += 1;
    customer.points += 1;

    let reward = null;

    if (
      customer.ordersCount === 5 &&
      !customer.rewards.includes("Free Drink")
    ) {
      reward = "Free Drink ☕";
      customer.rewards.push("Free Drink");
    }

    if (
      customer.ordersCount === 10 &&
      !customer.rewards.includes("Free Dessert")
    ) {
      reward = "Free Dessert 🍰";
      customer.rewards.push("Free Dessert");
    }

    if (
      customer.ordersCount === 15 &&
      !customer.rewards.includes("Free Meal")
    ) {
      reward = "Free Meal 🍝";
      customer.rewards.push("Free Meal");
    }

    if (
      customer.ordersCount === 20 &&
      !customer.rewards.includes("VIP")
    ) {
      reward = "VIP Customer ⭐";
      customer.rewards.push("VIP");
    }

    await customer.save();

    res.json({
      order: savedOrder,
      reward,
      count: customer.ordersCount,
      points: customer.points,
      rewards: customer.rewards,
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