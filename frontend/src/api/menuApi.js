import api from "./axios";

// Get Menu (Customer)
export const getMenu = async () => {
  const res = await api.get("/menu");
  return res.data;
};

// Admin - Get Full Menu
export const getAdminMenu = async () => {
  const res = await api.get("/admin/menu");
  return res.data;
};

// Admin - Create Menu Item
export const createMenuItem = async (data) => {
  const res = await api.post("/menu", data);
  return res.data;
};

// Admin - Update Menu Item
export const updateMenuItem = async (id, data) => {
  const res = await api.put(`/menu/${id}`, data);
  return res.data;
};

// Admin - Soft Delete Menu Item
export const deleteMenuItem = async (id) => {
  const res = await api.delete(`/menu/${id}`);
  return res.data;
};
