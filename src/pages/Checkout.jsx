const Checkout = ({ cart, totalPrice, setPage, setCart, setOrders }) => {
const placeOrder = async () => {
  try {
    console.log("🚀 Sending order...");

    const response = await fetch("http://localhost:5000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        total: totalPrice,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Server error");
    }

    alert("Order placed! 🎉");

    setOrders((prev) => [...prev, data.order]);

    setCart([]);          // CLEAR CART ✅
    setPage("home");      // REDIRECT ✅

  } catch (error) {
    console.error("❌ Error:", error);
    alert("Order failed ❌");
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

        <button
          onClick={placeOrder}
          className="mt-5 w-full bg-amber-900 text-white py-2 rounded-lg"
        >
          Place Order 🚀
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