import { useState } from "react";

const menuData = {
  "Hot Coffee": [
    { id: 1, name: "Hot Coffee", price: 45 },
    { id: 2, name: "Cold Coffee", price: 80 },
    { id: 3, name: "Cutting Chai", price: 30 },
    { id: 4, name: "Lemon Ice Tea", price: 50 },
    { id: 5, name: "Black Currant Smoothie", price: 85 },
    { id: 6, name: "Strawberry Smoothie", price: 95 },
    { id: 7, name: "Raspberry Smoothie", price: 95 },
    { id: 8, name: "Blueberry Smoothie", price: 95 },
  ],

  "Comfort Food": [
    { id: 9, name: "Salted Fries", price: 60 },
    { id: 10, name: "Peri Peri Fries", price: 95 },
    { id: 11, name: "Pizza Margherita", price: 150 },
    { id: 12, name: "Cheese Garlic Maggi", price: 95 },
    { id: 13, name: "Vegetable Maggi", price: 85 },
    { id: 14, name: "Penne Arrabiata Pasta", price: 180 },
    { id: 15, name: "Pink Sauce Pasta", price: 190 },
    { id: 16, name: "Chicken Loaded Fries", price: 200 },
  ],

  "Healthy Food": [
    { id: 17, name: "Scrambled Eggs", price: 80 },
    { id: 18, name: "Egg Shakshuka", price: 110 },
    { id: 19, name: "Paneer Wrap", price: 80 },
    { id: 20, name: "Chicken Wrap", price: 180 },
    { id: 21, name: "Veg Rice Bowl", price: 150 },
    { id: 22, name: "Chicken Rice Bowl", price: 190 },
    { id: 23, name: "Greek Salad", price: 160 },
    { id: 24, name: "Peri Peri Steam Chicken", price: 230 },
  ],

  "Patisserie": [
    { id: 25, name: "Tiramisu", price: 160 },
    { id: 26, name: "Cheese Cake Bites", price: 80 },
    { id: 27, name: "Blueberry Cake", price: 90 },
    { id: 28, name: "Strawberry Shortcake", price: 80 },
  ],
};

const Menu = ({ addToCart }) => {
  const categories = Object.keys(menuData);
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-gradient-to-b from-[#f8f5f1] to-[#efeae3] min-h-screen">
      
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-900 mb-8">
        Our Menu
      </h1>
      <p className="text-center text-amber-700 mb-12 tracking-widest uppercase text-sm">
  Crafted with care
      </p>
      {/* Tabs */}
      <div className="flex justify-center mb-14 hover:ring-2 hover:ring-amber-300">
        <div className="flex flex-wrap gap-3 bg-white/60 backdrop-blur-lg p-2 rounded-full shadow-lg border border-amber-200">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300
              ${
                activeTab === category
                  ? "bg-amber-900 text-white shadow-md scale-105"
                  : "text-amber-900 hover:bg-amber-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {menuData[activeTab].map((item) => (
          <div
            key={item.id}
            className="
            bg-white/80
            backdrop-blur-md
            rounded-3xl
            border border-amber-200
            shadow-md
            hover:shadow-xl
            transition-all duration-300
            p-5
            group
          "
          >
            {/* Image Placeholder */}
            <div className="h-40 bg-gradient-to-br from-[#f5e6d8] to-[#ead7c4] rounded-2xl mb-4 flex items-center justify-center text-amber-700 font-semibold">
              Image Here
            </div>

            <h3 className="text-lg font-semibold text-amber-700 mb-1 rounded-full font-medium tracking-wide">
              {item.name}
            </h3>

            <p className="text-amber-700 font-medium mb-3">
              ₹{item.price}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="w-full mt-3 bg-amber-900
                        hover:bg-amber-800 text-white
                        py-2 rounded-full font-medium
                        tracking-wide transition shadow-sm hover:shadow-md"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;