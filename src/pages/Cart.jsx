import { useMemo } from "react";

const Cart = ({ cart, setCart, setPage }) => {
  const totalPrice = useMemo(
    () =>
      cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
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
                data-testid="checkout-button"
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