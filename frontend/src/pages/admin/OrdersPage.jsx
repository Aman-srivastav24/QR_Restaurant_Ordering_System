import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/orderApi";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      console.log(res.data);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="flex flex-col gap-5">
        {orders.map(order => (
          <div
            key={order.orderId}
            className="bg-white border rounded-xl p-5 shadow-sm"
          >

            <h3 className="text-lg font-semibold mb-2">
              Order ID: {order.orderId}
            </h3>

            <p className="text-sm text-gray-600">
              Table: <span className="font-medium text-black">{order.tableNo}</span>
            </p>

            <p className="text-sm text-gray-600">
              Status:{" "}
              <span
                className={`font-medium ${
                  order.status === "PLACED"
                    ? "text-yellow-600"
                    : order.status === "ACCEPTED"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </span>
            </p>

            <p className="text-sm text-gray-500 mb-3">
              Time: {new Date(order.createdAt).toLocaleString()}
            </p>

            <h4 className="font-medium mb-2">Items:</h4>

            <div className="flex flex-col gap-1 mb-3">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="text-sm text-gray-700"
                >
                  {item.menuItemName} × {item.quantity}
                </div>
              ))}
            </div>

            {order.status === "PLACED" && (
              <div className="flex gap-3 mt-3">

                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 active:scale-95 transition"
                  onClick={() => handleStatusUpdate(order.orderId, "ACCEPTED")}
                >
                  Accept
                </button>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:opacity-90 active:scale-95 transition"
                  onClick={() => handleStatusUpdate(order.orderId, "REJECTED")}
                >
                  Reject
                </button>

              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
