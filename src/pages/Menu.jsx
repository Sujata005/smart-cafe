const menuItems = [
  { id: 1, name: "Cappuccino", price: 180 },
  { id: 2, name: "Latte", price: 200 },
  { id: 3, name: "Chocolate Cake", price: 220 },
];

const Menu = ({ addToCart }) => {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {menuItems.map(item => (
        <div key={item.id} className="bg-white rounded-2xl shadow-md p-4">
          <div className="h-32 bg-amber-100 rounded-xl mb-3"></div>
          <h3 className="text-lg font-semibold text-amber-900">
            {item.name}
          </h3>
          <p className="text-amber-700">₹{item.price}</p>
          <button
            onClick={() => addToCart(item)}
            className="mt-3 bg-amber-900 text-white px-3 py-1 rounded-lg hover:bg-amber-800"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Menu;