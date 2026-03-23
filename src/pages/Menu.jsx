import { useState } from "react";

const menuData = {
  "Hot Coffee": [
    { id: 1, name: "Hot Coffee", price: 45, img: "hotCofee.png" },
    { id: 2, name: "Cold Coffee", price: 80, img: "coldCoffee.png"},
    { id: 3, name: "Cutting Chai", price: 30,img: "chai.png" },
    { id: 4, name: "Lemon Ice Tea", price: 50, img: "lemonTea.png" },
    { id: 5, name: "Black Currant Smoothie", price: 85, img: "blackcurant.png" },
    { id: 6, name: "Strawberry Smoothie", price: 95, img: "strawberry.png" },
    { id: 7, name: "Raspberry Smoothie", price: 95, img: "raspberry.png" },
    { id: 8, name: "Blueberry Smoothie", price: 95, img: "blueberry.png" },
    { id: 29, name: "Watermelon Mojito", price: 45, img: "watermelonMojito.png" },
    { id: 34, name: "Peach Mojito", price: 45, img: "peachMojito.png" },
  ],

  "Comfort Food": [
    { id: 9, name: "Salted Fries", price: 60, img: "salted.png" },
    { id: 10, name: "Peri Peri Fries", price: 95, img: "peri.png" },
    { id: 31, name: "Fortnite Chicken Sandwich", price: 45, img: "chicFortSand.png" },
    { id: 11, name: "Pizza Margherita", price: 150, img: "pizzo.png" },
    { id: 12, name: "Cheese Garlic Maggi", price: 95, img: "cheeseGarlicMaggie.png" },
    { id: 13, name: "Vegetable Maggi", price: 85, img: "vegMaggie.png" },
    { id: 14, name: "Penne Arrabiata Pasta", price: 180, img: "penneArb.png" },
    { id: 15, name: "Pink Sauce Pasta", price: 190, img: "pink.png" },
    { id: 16, name: "Chicken Loaded Fries", price: 200, img: "chickFries.png" },
    { id: 35, name: "Spaghetti Aglio e Olio", price: 45, img: "Spag.png" },
  ],

  "Healthy Food": [
    { id: 17, name: "Scrambled Eggs", price: 80, img: "egg.png" },
    { id: 18, name: "Egg Shakshuka", price: 110, img: "shakshuka.png" },
    { id: 19, name: "Paneer Wrap", price: 80, img: "paneerWrap.png" },
    { id: 20, name: "Chicken Wrap", price: 180, img: "wrap.png" },
    { id: 21, name: "Veg Rice Bowl", price: 150, img: "vegBowl.png" },
    { id: 22, name: "Chicken Rice Bowl", price: 190, img: "chikenRiceBowl.png" },
    { id: 23, name: "Greek Salad", price: 160, img: "greek.png" },
    { id: 36, name: "Vegetable Salad", price: 45, img: "vegeSalad.png" },
    { id: 24, name: "Peri Peri Steam Chicken", price: 230, img: "steamedChic.png" },
    { id: 30, name: "Ceasre Salad", price: 45, img: "CeasreSalad.png" },
    { id: 32, name: "Chicken Salad", price: 45, img: "chikenSalad.png" },
    { id: 33, name: "Mexican Rice Bowl", price: 45, img: "MexicanRiceBowl.png" },
  ],

  "Patisserie": [
    { id: 25, name: "Tiramisu", price: 160, img: "tiramasu.png"},
    { id: 26, name: "Cheese Cake Bites", price: 80, img: "CheeseBites.png" },
    { id: 27, name: "Blueberry Cake", price: 90, img: "BlueberryCake.png" },
    { id: 28, name: "Strawberry Shortcake", price: 80, img: "StrawberryShort.png" },
  ],
};

const Menu = ({ addToCart }) => {
  const categories = Object.keys(menuData);

  const [activeTab, setActiveTab] = useState(categories[0]);
  const [search, setSearch] = useState("");
  const [animateId, setAnimateId] = useState(null);

  const filtered =
    menuData[activeTab].filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleAdd = (item) => {
    addToCart(item);

    setAnimateId(item.id);

    if (typeof Audio !== "undefined") {
      try {
        const sound = new Audio("/click.mp3");
        if (sound.play) {
          sound.play().catch(() => {});
        }
      } catch {
        // ignore audio issues in test/edge env
      }
    }

    setTimeout(() => setAnimateId(null), 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f2ec] to-[#e7ded2] px-6 py-16">

      {/* TITLE */}
      <div className="text-center mb-8">

        <h1 className="text-5xl font-bold text-amber-900">
           Menu
        </h1>

        <p className="tracking-[5px] text-amber-700 text-sm">
          handcrafted with love
        </p>

      </div>


      {/* SEARCH */}
      <div className="flex justify-center mb-10">

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-80 px-4 py-2
            rounded-full
            border border-amber-300
            bg-white/70
            backdrop-blur
            focus:ring-2 focus:ring-amber-400
          "
        />

      </div>


      {/* TABS */}
      <div className="flex justify-center mb-12">

        <div className="
          flex gap-3
          bg-white/50
          backdrop-blur-xl
          border border-amber-200
          p-2
          rounded-full
          shadow-lg
        ">

          {categories.map((cat) => (

            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`
                px-6 py-2 rounded-full
                transition-all
                ${
                  activeTab === cat
                    ? "bg-gradient-to-r from-amber-900 to-amber-700 text-white scale-110 shadow-lg"
                    : "text-amber-900 hover:bg-amber-100"
                }
              `}
            >
              {cat}
            </button>

          ))}

        </div>

      </div>


      {/* GRID */}
      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        gap-12
        max-w-6xl
        mx-auto
      ">

        {filtered.map((item) => (

          <div
            key={item.id}
            data-testid="menu-item"
            className="
              rounded-3xl
              overflow-hidden
              bg-white/60
              backdrop-blur-xl
              border border-amber-200
              shadow-md
              hover:shadow-2xl
              hover:-translate-y-2
              transition-all
              duration-500
            "
          >

            {/* IMAGE */}
            <div className="h-52 overflow-hidden relative">

              <img
                src={`/images/menu/${item.img}`}
                alt={item.name}
                className="
                  w-full h-full object-cover
                  transition duration-700
                  hover:scale-110
                "
              />

              {/* <div className="
                absolute top-3 left-3
                bg-black/70
                text-white text-xs
                px-2 py-1
                rounded-full
              ">
                ⭐ Popular
              </div> */}

            </div>


            {/* CONTENT */}
            <div className="p-5">

              <h3 className="text-xl font-semibold text-amber-900">
                {item.name}
              </h3>

              <p className="text-amber-700 mb-4">
                ₹ {item.price}
              </p>


              <button
                onClick={() => handleAdd(item)}
                data-testid="add-to-cart-button"
                className={`
                  w-full py-2 rounded-full
                  bg-gradient-to-r
                  from-amber-900 to-amber-700
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:shadow-xl
                  ${
                    animateId === item.id
                      ? "scale-110 ring-4 ring-amber-300"
                      : ""
                  }
                `}
              >
                Add to Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Menu;