import { useState } from "react";
import { apiFetch } from "../api";

const Checkout = ({ cart, totalPrice, setPage, setCart, setOrders }) => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeOrder = async () => {
    if (!customerName || customerName.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (!phone.match(/^[0-9]{10}$/)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    if (!cart || cart.length === 0) {
      setError("Cart is empty. Add items before placing order.");
      return;
    }

    if (cart.some(item => !item.qty || item.qty < 1)) {
      setError("All cart items must have qty > 0.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      console.log("🚀 Sending order...");

    const data = await apiFetch("/orders", {
      method: "POST",
      body: {
        items: cart,
        total: totalPrice,
        customerName,
        phone,
      },
    });

    // ✅ SAFE ALERT (no loyalty crash)
    if (data.reward) {

      alert(
        `Order placed 🎉\nReward unlocked: ${data.reward}\nTotal orders: ${data.count}`
      );

    } else {

      alert("Order placed 🎉");

    }

    setOrders((prev) => [...prev, data.order || data]);

    setCart([]);
    setPage("home");

  } catch (error) {
      console.error("❌ Error:", error);
      setError("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Order Summary ☕</h1>

      <div className="bg-white rounded-xl shadow-md p-4">
        {cart.length === 0 ? (
          <p>Your cart is empty 😢</p>
        ) : (
          cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between border-b py-2"
            >
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))
        )}

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          data-testid="name"
          className="border p-2 rounded-lg w-full mb-2"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          data-testid="phone"
          className="border p-2 rounded-lg w-full mb-3"
        />

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <button
          onClick={placeOrder}
          disabled={loading}
          data-testid="submit-order"
          className={`mt-5 w-full py-2 rounded-lg text-white ${
            loading ? "bg-amber-500 cursor-not-allowed" : "bg-amber-900"
          }`}
        >
          {loading ? "Placing order..." : "Place Order 🚀"}
        </button>

        <button
          onClick={() => setPage("cart")}
          className="mt-3 w-full border border-amber-900 text-amber-900 py-2 rounded-lg"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Checkout;