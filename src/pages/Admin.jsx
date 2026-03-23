import React from "react";

const getTimeInfo = (createdAt) => {

  const now = new Date();
  const created = new Date(createdAt);

  const diff = (now - created) / 60000;

  const left = Math.max(30 - diff, 0);

  let color = "green";

  if (diff >= 25 && diff < 30) color = "yellow";
  if (diff >= 30) color = "red";

  return {
    left: left.toFixed(1),
    color,
  };
};
const TimerIcon = ({ color }) => {

  const c =
    color === "red"
      ? "#dc2626"
      : color === "yellow"
      ? "#eab308"
      : "#16a34a";

  return (

    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={c}
    >
      <path d="M6 2h12v2H6zM6 20h12v2H6zM12 6a6 6 0 1 0 0 12A6 6 0 0 0 12 6z"/>
    </svg>

  );
};

const Admin = ({ orders, updateStatus, setPage, setToken }) => {

  // newest first
  const sorted = [...orders].reverse();
  const [, setTick] = React.useState(0);

  React.useEffect(() => {

    const t = setInterval(() => {
      setTick(t => t + 1);
    }, 1000);

  return () => clearInterval(t);

}, []);
  return (

    <div className="min-h-screen bg-amber-50 p-6">

      {/* header */}
      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Kitchen Dashboard 👨‍🍳
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => setPage("home")}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Back ☕
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              setToken(null);
              setPage("home");
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

      </div>


      {sorted.length === 0 ? (

        <p>No orders</p>

      ) : (

        <div className="grid gap-4">

          {sorted.map(order => {

            const info = getTimeInfo(order.createdAt);

            const color = info.color;

            const border =
              color === "red"
                ? "border-2 border-red-500 animate-pulse"
                : color === "yellow"
                ? "border-2 border-yellow-400"
                : "border border-gray-200";

            return (

              <div
                key={order._id}
                className={`bg-white p-4 rounded-xl shadow-md ${border}`}
              >

                {/* top */}
                <div className="flex justify-between">

                  <h2>
                    Order #{order._id.slice(-5)}
                  </h2>

                  <span>
                    ₹ {order.total}
                  </span>

                </div>


                {/* items */}
                <div>

                  {order.items.map((i, idx) => (
                    <p key={idx}>
                      🍽 {i.name} × {i.qty}
                    </p>
                  ))}

                </div>


                {/* timer */}

                <p
                  className={`flex items-center gap-2 font-semibold ${
                    info.color === "red"
                    ? "text-red-600"
                    : info.color === "yellow"
                    ? "text-yellow-500"
                    : "text-green-600"
                  }`}
                >

                  <TimerIcon color={info.color} />

                  {info.left} min left

                  </p>

                {/* buttons */}
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() =>
                      updateStatus(order._id, "Preparing")
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Preparing
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order._id, "Ready")
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Ready
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(order._id, "Delivered")
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Delivered
                  </button>

                </div>


                <p className="text-xs mt-2">
                  Status: {order.status}
                </p>

              </div>

            );

          })}

        </div>

      )}

    </div>

  );
};

export default Admin;