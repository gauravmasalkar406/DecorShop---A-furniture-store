import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.js";

// get all products
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json({ products });
});

// fetch products indivisually
export const getProductById = asyncHandler(async (req, res) => {
  // id
  const productId = req.params.productId;

  // find product by id
  const product = await Product.findById(productId);

  // if product present then send it to the user
  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// create product
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    user,
    shipping,
  } = req.body;

  const product = new Product({
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    user,
    shipping,
  });

  const createdProduct = await product.save();

  res
    .status(200)
    .json({ message: "Product created successfully", createdProduct });
});

// delete product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
