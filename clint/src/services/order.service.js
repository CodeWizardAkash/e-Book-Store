import API from "./api.service";

export const placeOrder = async (orderData) => {
  const res = await API.post("/orders/place", orderData);
  return res.data;
};