import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controller/cart.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);

router.get("/", protect, getCart);

router.put("/update/:bookId", protect, updateCartItem);

router.delete("/remove/:bookId", protect, removeFromCart);

router.delete("/clear", protect, clearCart);

export default router;