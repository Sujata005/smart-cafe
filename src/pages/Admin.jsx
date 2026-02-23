const Admin = ({ orders, updateStatus, setPage }) => {
  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Kitchen Dashboard 👨‍🍳</h1>

      {orders.length === 0 ? (
        <p>No orders yet 😌</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl shadow-md p-4 mb-4"
          >
            <div className="flex justify-between mb-2">
              <span className="font-bold">Order #{order.id}</span>
              <span className="text-sm">{order.status}</span>
            </div>

            {order.items.map((item, index) => (
              <div key={index} className="text-sm">
                • {item.name} – ₹{item.price}
              </div>
            ))}

            <div className="font-bold mt-2">
              Total: ₹{order.total}
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(order.id, "Preparing")}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Preparing
              </button>

              <button
                onClick={() => updateStatus(order.id, "Delivered")}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Delivered
              </button>
            </div>
          </div>
        ))
      )}

      <button
        onClick={() => setPage("home")}
        className="mt-4 border border-amber-900 text-amber-900 px-4 py-2 rounded"
      >
        Back Home
      </button>
    </div>
  );
};

export default Admin;