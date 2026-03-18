import React from "react";

const Admin = ({ orders, updateStatus, setPage }) => {
  return (
    <div className="min-h-screen bg-amber-50 p-6">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kitchen Dashboard 👨‍🍳</h1>
        
        <button
          onClick={() => setPage("home")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Back to Café ☕
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet 😌</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow-md"
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">
                  Order #{order._id}
                </h2>
                <span className="text-sm text-gray-500">
                  ₹ {order.total}
                </span>
              </div>

              <div className="mt-2">
                {order.items.map((item, index) => (
                  <p key={index} className="text-sm">
                    🍽 {item.name} × {item.qty}
                  </p>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    updateStatus(order._id, "Preparing")
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Preparing
                </button>

                <button
                  onClick={() =>
                    updateStatus(order._id, "Ready")
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Ready
                </button>

                <button
                  onClick={() =>
                    updateStatus(order._id, "Delivered")
                  }
                  className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  Delivered
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Status: {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;