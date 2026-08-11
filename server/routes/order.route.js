import express from "express";
import { placeOrder, getMyOrders, getOrderById } from "../controller/order.controller.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", protect, placeOrder);
router.get("/", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

export default router;