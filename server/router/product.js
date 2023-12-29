import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
  uniqueCategories,
  uniqueBrands,
} from "../controllers/product.js";

// get products route
router.get(
  "/get_products/:searchQuery/:category/:brand/:price/:shipping/:currentPage",
  getProducts
);

router.get("/unique_cat", uniqueCategories);

router.get("/unique_brand", uniqueBrands);

router.get("/:productId", getProductById);

router.post("/create", protect, admin, createProduct);

export default router;
