const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

app.post("/order", (req, res) => {
  console.log("📦 Order endpoint HIT");
  console.log("Body:", req.body);

  const order = {
    id: Date.now(),
    items: req.body.items,
    total: req.body.total,
    status: "Pending"
  };

  orders.push(order);

  res.json({ message: "Order placed!", order });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});