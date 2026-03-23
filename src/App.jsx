import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Reviews from "./pages/Reviews";
import AdminLogin from "./pages/AdminLogin";
import { apiFetch } from "./api";


function App() {
  const lastIdsRef = useRef([]);
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));
  const [page, setPage] = useState(token ? "admin" : "home");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ Fetch orders (live sync)

const fetchOrders = async () => {
  try {
    const data = await apiFetch("/orders");

    const currentIds = data.map(o => o._id);

    const newOnes = currentIds.filter(
      id => !lastIdsRef.current.includes(id)
    );

    if (newOnes.length > 0 && lastIdsRef.current.length > 0) {

      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});

    }

    lastIdsRef.current = currentIds;

    setOrders(data);

  } catch (err) {

    console.log(err);

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

    await apiFetch(`/orders/${orderId}`, {
      method: "PUT",
      body: { status: newStatus },
    });

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
    <ErrorBoundary>
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
        <AdminLogin setPage={setPage} setToken={setToken} />
      )}
      {page === "admin" && token && (
        <Admin
          orders={orders}
          updateStatus={updateStatus}
          setPage={setPage}
          setToken={setToken}
        />
      )}
      {page === "admin" && !token && (
          <AdminLogin setPage={setPage} setToken={setToken} />
      )}
      {page === "reviews" && (
        <Reviews setPage={setPage} />
      )}

      </div>
    </ErrorBoundary>
  );
}

export default App;