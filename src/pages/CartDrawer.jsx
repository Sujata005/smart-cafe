import { useEffect, useRef } from "react";

const CartDrawer = ({ isOpen, setIsOpen, cartItems, setPage }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (e.key === "Tab") {
        const focusable = drawerRef.current?.querySelectorAll(
          "button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])"
        );
        if (focusable && focusable.length > 0) {
          const firstEl = focusable[0];
          const lastEl = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 transition-all duration-500" role="dialog" aria-modal="true" aria-label="Cart drawer">
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-amber-900">Your Cart</h2>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto h-[70%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            cartItems.map((item, i) => (
              <div key={item.id ?? i} className="flex justify-between">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t">
          <button
            onClick={() => setPage("checkout")}
            className="w-full bg-amber-900 text-white py-3 rounded-xl hover:shadow-lg transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;