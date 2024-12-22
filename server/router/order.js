import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  stripePayment,
  stripeWebhook,
} from "../controllers/order.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/add_order_items", protect, addOrderItems);

router.post("update_order_to_paid", protect, updateOrderToPaid);

router.post("/get_my_orders", protect, getMyOrders);

router.put("/update_order_to_paid", protect, updateOrderToPaid);

router.put(
  "/update_order_to_delivered",
  protect,
  admin,
  updateOrderToDelivered
);

router.post("/get_order_by_id", protect, getOrderById);

router.get("/get_all_orders_admin", protect, admin, getOrders);

router.post("/create_checkout_session", protect, stripePayment);

export default router;
