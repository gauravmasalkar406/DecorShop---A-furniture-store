import asyncHandler from "../middleware/asyncHandler.js";
import CartProduct from "../models/cart.js";

// add items to cart
export const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  const existingCartProduct = await CartProduct.findOne({
    user: userId,
    product: productId,
  });

  // if it exists update quantity
  if (existingCartProduct) {
    existingCartProduct.quantity += quantity;
    await existingCartProduct.save();

    // find all cart items
    const cartItems = await CartProduct.find({ user: userId });

    return res.status(200).json({
      message: "Added to cart",
      cartItems,
    });
  }

  // create product
  const cartProduct = await CartProduct.create({
    user: userId,
    product: productId,
    quantity,
    price,
  });

  // find all cart items
  const cartItems = await CartProduct.find({ user: userId });

  if (cartProduct) {
    // send user details as response
    return res.status(200).json({
      message: "Added to cart",
      cartItems,
    });
  }

  res.status(400);
  throw new Error("Failed to add to cart");
});

// get cart items
export const getCartItems = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // find all cart items
  const cartItems = await CartProduct.find({ user: userId });

  if (cartItems) {
    return res.status(200).json({
      message: true,
      cartItems,
    });
  }

  res.status(400);
  throw new Error("Cart is empty");
});

// delete cart item
export const deleteCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const deletionResult = await CartProduct.deleteOne({ product: productId });

  // Check if the deletion was successful
  if (deletionResult.deletedCount > 0) {
    return res.status(200).json({
      message: "Item deleted successfully",
    });
  }

  return res.status(400).json({
    message: "Item not found or could not be deleted",
  });
});

// empty the cart
export const removeCartItems = asyncHandler(async (req, res) => {
  const { user } = req.body;

  // Validate userId
  if (!user) {
    return res.status(400).json({
      message: "Invalid userId in the request",
    });
  }

  const deletionResult = await CartProduct.deleteMany({ user: user });

  // Check if the deletion was successful
  if (deletionResult.deletedCount > 0) {
    return res.status(200).json({
      message: "Items deleted successfully",
    });
  }

  return res.status(404).json({
    message: "Items not found or could not be deleted",
  });
});
