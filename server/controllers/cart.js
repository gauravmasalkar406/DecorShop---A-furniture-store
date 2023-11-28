import asyncHandler from "../middleware/asyncHandler.js";
import CartProduct from "../models/cart.js";

// add items to cart
export const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  // check wheter product exists in cart
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

    res.status(200).json({
      message: "Added to cart",
      cartItems,
    });
  } else {
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
      res.status(200).json({
        message: "Added to cart",
        cartItems,
      });
    } else {
      res.status(400);
      throw new Error("Unable to add to cart");
    }
  }
});

// get cart items
export const getCartItems = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // find all cart items
  const cartItems = await CartProduct.find({ user: userId });

  // send cart items as response
  if (cartItems) {
    res.status(200).json({
      message: true,
      cartItems,
    });
  } else {
    res.status(400);
    throw new Error("Cart is empty");
  }
});

// delete cart item
export const deleteCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  const deletionResult = await CartProduct.deleteOne({ product: productId });

  // Check if the deletion was successful
  if (deletionResult.deletedCount > 0) {
    res.status(200).json({
      message: "Item deleted successfully",
    });
  } else {
    res.status(400).json({
      message: "Item not found or could not be deleted",
    });
  }
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

  try {
    const deletionResult = await CartProduct.deleteMany({ user: user });

    // Check if the deletion was successful
    if (deletionResult.deletedCount > 0) {
      return res.status(200).json({
        message: "Items deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "Items not found or could not be deleted",
      });
    }
  } catch (error) {
    // Handle other potential errors
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
