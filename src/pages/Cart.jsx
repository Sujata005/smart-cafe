const Cart = ({ cart, setCart, setPage }) => {

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const removeItem = (id) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };
const handleCheckout = () => {
  setPage("checkout");
};
console.log(setPage);
const placeOrder = async () => {
  try {
    const response = await fetch("https://smart-cafe-tiz3.onrender.com", {
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
    console.log("Order response:", data);

    alert("Order placed successfully! 🎉");
  } catch (error) {
    console.error("Order error:", error);
    alert("Failed to place order ❌");
  }
};
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-900 mb-6">
        Your Cart 🛒
      </h2>

      {cart.length === 0 ? (
        <p className="text-amber-700">Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div
              key={item.id}
              className="bg-white shadow-sm rounded-xl p-4 mb-4 flex justify-between"
            >
              <div>
                <h3 className="font-semibold text-amber-900">
                  {item.name}
                </h3>
                <p className="text-sm text-amber-700">
                  ₹{item.price} × {item.qty}
                </p>
              </div>
              <button onClick={placeOrder}>
                Place Order
              </button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 text-right">
            <p className="text-lg font-bold text-amber-900">
              Total: ₹{totalPrice}
            </p>

            <button 
                onClick={handleCheckout}
                className="mt-3 bg-amber-900 text-white px-5 py-2 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;