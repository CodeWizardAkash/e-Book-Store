import API from "./api.service";

export const placeOrder = async (orderData) => {
  const res = await API.post("/orders/place", orderData);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await API.get("/orders");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await API.get(`/orders/${id}`);
  return res.data;
};