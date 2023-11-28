import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/product.js";

// get products route
router.get("/get_products", getProducts);

router.get("/:productId", getProductById);

router.post("/create", protect, admin, createProduct);

export default router;
