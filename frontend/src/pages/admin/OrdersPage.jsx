import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/orderApi";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      console.log(res.data)
      setOrders(res.data);
    //   console.log(orders.item)
      
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
    <div style={{ padding: "30px" }}>
      <h1>Orders</h1>

      {orders.map(order => (
        <div
          key={order.orderId}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px"
          }}
        >
          <h3>Order ID: {order.orderId}</h3>
          <p>Table: {order.tableNo}</p>
          <p>Status: {order.status}</p>
          <p>Time: {new Date(order.createdAt).toLocaleString()}</p>

          <h4>Items:</h4>
          {order.items.map(item => (
            <div key={item.id}>
              {item.menuItemName} × {item.quantity}
            </div>
          ))}

          {order.status === "PLACED" && (
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleStatusUpdate(order.orderId, "ACCEPTED")}
              >
                Accept
              </button>

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleStatusUpdate(order.orderId, "REJECTED")}
              >
                Reject
              </button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}
