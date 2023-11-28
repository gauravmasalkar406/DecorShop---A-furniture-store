import express from "express";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCartItems,
  deleteCartItem,
  removeCartItems,
} from "../controllers/cart.js";

// add to cart route
router.post("/add_to_cart", protect, addToCart);

router.post("/get_cart_items", protect, getCartItems);

router.post("/delete_cart_item", protect, deleteCartItem);

router.post("/remove_cart_items", protect, removeCartItems);

export default router;
