import api from "./axios";

// Place Order (Customer)
export const placeOrder = async (data) => {
  const res = await api.post("/orders", data);
  return res.data;
};

// Admin - Get All Orders
export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// Admin - Update Order Status
export const updateOrderStatus = async (orderId, status) => {
  const res = await api.put(`/admin/orders/${orderId}/status`, { status });
  return res.data;
};
