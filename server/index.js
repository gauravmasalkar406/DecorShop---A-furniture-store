import path from "node:path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db.js";
import userRoutes from "./router/user.js";
import productRoutes from "./router/product.js";
import cartRoutes from "./router/cart.js";
import orderRoutes from "./router/order.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import uploadRoutes from "./router/upload.js";
import { stripeWebhook } from "./controllers/order.js";

// app
const app = express();

// Webhook route with raw body middleware
app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Then apply the JSON body parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// database connection
connectToDatabase();

// origin configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// port
const PORT = process.env.PORT || 5000;

// api routes
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/upload", uploadRoutes);

// making upload folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// error middlewares
app.use(notFound);
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
