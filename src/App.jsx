import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Reviews from "./pages/Reviews";
import AdminLogin from "./pages/AdminLogin";


function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lastOrderCount, setLastOrderCount] = useState(0);
  const token = localStorage.getItem("adminToken");
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ Fetch orders (live sync)
const fetchOrders = async () => {
  try {
    const res = await fetch(
      "https://smart-cafe-tiz3.onrender.com/api/orders"
    );

    const data = await res.json();

    // ✅ remove delivered here
    const activeOrders = data.filter(
      o => o.status !== "Delivered"
    );

    const newOnes = active.filter(
      o => !orders.some(p => p._id === o._id)
    );

    if (newOnes.length > 0) {

      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});

    }

    setLastOrderCount(activeOrders.length);
    setOrders(activeOrders);

  } catch (err) {
    console.error("Failed to fetch orders", err);
  }
};
useEffect(() => {

  fetchOrders();

  const interval = setInterval(fetchOrders, 3000);

  return () => clearInterval(interval);

}, []); // ✅ only once

useEffect(() => {
  if (page === "admin") {
    fetchOrders();
  }
}, [page]);

  // ✅ Update order status
  const updateStatus = async (orderId, newStatus) => {
  try {

    await fetch(
      `https://smart-cafe-tiz3.onrender.com/api/orders/${orderId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      }
    );

    // // ✅ update + remove delivered
    // setOrders(prev =>
    //   prev
    //     .map(order =>
    //       order._id === orderId
    //         ? { ...order, status: newStatus }
    //         : order
    //     )
    //     .filter(order => order.status !== "Delivered")
    // );
    fetchOrders();

  } catch (err) {
    console.error("Status update failed", err);
  }
};

  // ✅ Add to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(
        i => i.id === item.id
      );

      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [
        ...prevCart,
        { ...item, qty: 1 }
      ];
    });
  };


  return (
    <div className="min-h-screen bg-amber-50 transition-all duration-500">

      <Navbar setPage={setPage} cart={cart} />

      {page === "home" && <Home setPage={setPage} />}

      {page === "menu" && (
        <Menu addToCart={addToCart} />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          setCart={setCart}
          setPage={setPage}
        />
      )}

      {page === "checkout" && (
        <Checkout
          cart={cart}
          totalPrice={totalPrice}
          setPage={setPage}
          setCart={setCart}
          setOrders={setOrders}
        />
      )}
      {page === "adminLogin" && (
        <AdminLogin setPage={setPage} />
      )}
      {page === "admin" && (
        <Admin
          orders={orders}
          updateStatus={updateStatus}
          setPage={setPage}
        />
      )}

      {page === "reviews" && (
        <Reviews setPage={setPage} />
      )}

    </div>
  );
}

export default App;