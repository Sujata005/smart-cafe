import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <Menu />

const CartDrawer = ({ isOpen, setIsOpen, cartItems }) => {
  return (
    <>
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-100 via-white to-amber-50 animate-pulse opacity-30">
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 z-40 
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50
        transform transition-transform duration-500
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-amber-900">Your Cart</h2>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto h-[70%]">
          {cartItems.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            cartItems.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t">
          <button className="w-full bg-amber-900 text-white py-3 rounded-xl hover:shadow-lg transition">
            Checkout
          </button>
        </div>
      </div>
      </div>
    </>
  );
};
</motion.div>
export default CartDrawer;