const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let reviews = [];
let customers = [];
let orders = [];

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});
app.post("/review", (req, res) => {
  const { name, rating, comment } = req.body;

  if (!name || !rating || !comment) {
    return res.status(400).json({ message: "All fields required" });
  }

  const review = {
    id: Date.now(),
    name,
    rating,
    comment
  };

  reviews.push(review);

  res.json({ message: "Review added!", review });
});
app.get("/reviews", (req, res) => {
  res.json(reviews);
});
app.get("/orders", (req, res) => {
  res.json(orders);
});
app.post("/order/status", (req, res) => {
  const { id, status } = req.body;

  orders = orders.map(order =>
    order.id === id ? { ...order, status } : order
  );

  res.json({ message: "Status updated" });
});
app.post("/order", (req, res) => {
  const { items, total, customerName, phone } = req.body;

  if (!customerName || !phone) {
    console.log("❌ Missing:", { customerName, phone });
    return res.status(400).json({ 
      message: "Missing customer info",
      received: { customerName, phone }
    });
  }

  // Find existing customer
  let customer = customers.find(c => c.phone === phone);

  if (customer) {
    customer.points += 1;
  } else {
    customer = {
      name: customerName,
      phone,
      points: 1
    };
    customers.push(customer);
  }

  // Reward logic
  let reward = null;

  if (customer.points === 5) reward = "Free Dessert 🍰";
  if (customer.points === 10) reward = "Free Drink 🥤";

  const order = {
    id: Date.now(),
    items,
    total,
    status: "Pending",
    customerName,
    phone
  };

  orders.push(order);

  res.json({
    message: "Order placed!",
    order,
    loyalty: {
      points: customer.points,
      reward
    }
  });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});