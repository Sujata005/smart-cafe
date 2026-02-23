import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === item.id);

      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [...prevCart, { ...item, qty: 1 }];
    });
  };
const updateStatus = (orderId, newStatus) => {
      setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
    )
  );
};
  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar setPage={setPage} cart={cart}/>
      {page === "home" && <Home setPage={setPage} />}
      {page === "menu" && <Menu addToCart={addToCart}/>}
      {page === "cart" && <Cart cart={cart} setCart={setCart} setPage={setPage}/>}
      {page === "checkout" && (
        <Checkout
          cart={cart}
          totalPrice={totalPrice}
          setPage={setPage}
          setCart={setCart} 
          setOrders={setOrders} 
        />
      )}
      {page === "admin" && (
        <Admin
          orders={orders}
          updateStatus={updateStatus}
          setPage={setPage}
        />
      )}
    </div>
  );
}

export default App;