import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/product.js";

// get all products
export const getProducts = asyncHandler(async (req, res) => {
  let {
    searchQuery,
    category,
    brand,
    price,
    shipping,
    currentPage = 1,
  } = req.params;

  try {
    const pageSize = 6;

    // query filter
    const keyword =
      searchQuery.length < 3 || searchQuery === "default"
        ? {}
        : { name: { $regex: searchQuery, $options: "i" } };

    // category filter
    category = category === "all" ? {} : { category: category };

    // brand filter
    brand = brand === "all" ? {} : { brand: brand };

    // price filter --> get products price equal or greater than the price
    price = price === 0 ? {} : { price: { $gte: price } };

    // shipping filter
    shipping = shipping === "true" ? { shipping: true } : {};

    // filtered products
    const products = await Product.find({
      ...keyword,
      ...category,
      ...brand,
      ...price,
      ...shipping,
    })
      .limit(pageSize)
      .skip(pageSize * (currentPage - 1));

    // count number of documents
    const count = await Product.countDocuments({
      ...keyword,
      ...category,
      ...brand,
      ...price,
      ...shipping,
    });

    res.json({
      products,
      totalProducts: count,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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

// get all unique categories
export const uniqueCategories = async (req, res) => {
  try {
    const uniqueCategories = await Product.distinct("category");

    res.status(200).json({ unique: uniqueCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all unique categories
export const uniqueBrands = async (req, res) => {
  try {
    const uniqueBrands = await Product.distinct("brand");

    res.status(200).json({ unique: uniqueBrands });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
