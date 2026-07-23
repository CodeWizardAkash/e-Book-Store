import API from "./api.service";

// Get Cart
export const getCart = async () => {
  const res = await API.get("/cart");
  return res.data;
};

// Add to Cart
export const addToCart = async (bookId, quantity = 1) => {
  const res = await API.post("/cart/add", {
    bookId,
    quantity,
  });

  return res.data;
};

// Update Quantity
export const updateCart = async (bookId, quantity) => {
  const res = await API.put(`/cart/update/${bookId}`, {
    quantity,
  });

  return res.data;
};

// Remove Item
export const removeFromCart = async (bookId) => {
  const res = await API.delete(`/cart/remove/${bookId}`);
  return res.data;
};

// Clear Cart
export const clearCart = async () => {
  const res = await API.delete("/cart/clear");
  return res.data;
};