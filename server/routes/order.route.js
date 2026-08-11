import express from "express";
import { placeOrder } from "../controller/order.controller.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/place", protect, placeOrder);

export default router;