const Navbar = ({ setPage, cart }) => {
const totalItems = cart?.reduce((sum, item) => sum + item.qty, 0) || 0;
  return (
    <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-amber-900">
        HiGa Café
      </h1>

      <div className="space-x-8 text-sm">
        <button 
            onClick={() => setPage("home")} 
            className="text-amber-800 hover:text-amber-600"
        >
          Home
        </button>
        <button 
            onClick={() => setPage("menu")} 
            className="text-amber-800 hover:text-amber-600"
        >
          Menu
        </button>
        {/* <button onClick={() => setPage("reviews")}>
          Reviews ⭐
        </button> */}
        {/* <button
          onClick={() => setPage("admin")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Admin Panel 👨‍🍳
        </button> */}
        {/* <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-amber-900 text-white px-4 py-2 rounded-full hover:scale-105 transition"
        >
  Cart
</button>
        <div
            onClick={() => setPage("cart")}
            className="bg-amber-900 text-white px-3 py-1 rounded-lg text-xs cursor-pointer"
        >
            Cart 🛒 {totalItems}
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;