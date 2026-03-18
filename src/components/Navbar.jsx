import { useRef, useState } from "react";

const Navbar = ({ setPage, cart }) => {

  const totalItems =
    cart?.reduce((sum, item) => sum + item.qty, 0) || 0;

  const timerRef = useRef(null);
  const [showToast, setShowToast] = useState(false);


  // LONG PRESS START
  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {

      // vibration (mobile)
      if (navigator.vibrate) {
        navigator.vibrate(200);
      }

      // show toast
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setPage("adminLogin");
      }, 800);

    }, 1500);
  };


  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
  };


  return (
    <>

      <nav
        className="
        bg-amber-50/90
        backdrop-blur-md
        border-b border-amber-200
        px-8 py-4
        flex justify-between items-center
        shadow-sm
      "
      >

        {/* Logo */}
        <h1
          onClick={() => setPage("home")}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="
          text-2xl font-semibold
          text-amber-900
          tracking-wide
          cursor-pointer
          select-none
          hover:text-amber-700
          hover:underline
          transition
        "
        >
          HiGa Café
        </h1>


        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <button
            onClick={() => setPage("home")}
            className="
            text-amber-800
            hover:text-amber-600
            transition
          "
          >
            Home
          </button>


          <button
            onClick={() => setPage("menu")}
            className="
            text-amber-800
            hover:text-amber-600
            transition
          "
          >
            Menu
          </button>


          {/* Cart */}
          <button
            onClick={() => setPage("cart")}
            className="
            bg-amber-900
            text-white
            px-4 py-1.5
            rounded-full
            text-xs
            shadow-sm
            hover:shadow-md
            hover:bg-amber-800
            transition-all
          "
          >
            Cart 🛒 {totalItems}
          </button>

        </div>

      </nav>


      {/* TOAST */}
      {showToast && (
        <div
          className="
          fixed bottom-6 left-1/2 -translate-x-1/2
          bg-amber-900 text-white
          px-4 py-2
          rounded-full
          text-sm
          shadow-lg
          animate-fadeIn
        "
        >
          Admin mode ☕
        </div>
      )}

    </>
  );
};

export default Navbar;