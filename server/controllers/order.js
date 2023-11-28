import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import stripePackage from "stripe";
import dotenv from "dotenv";
dotenv.config();

export const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, userId, shippingAddress, paymentMethod, totalPrice } =
    req.body;

  try {
    if (orderItems && orderItems.length == 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const orderItemsWithProducts = await Promise.all(
        orderItems.map(async (x) => {
          const product = await Product.findById(x.product).exec();

          if (!product) {
            console.error(`Product not found for ID: ${x.product}`);
            return null;
          }

          return {
            ...x,
            product,
            productId: x.product,
            _id: undefined,
          };
        })
      );

      const validOrderItemsWithProducts = orderItemsWithProducts.filter(
        (item) => item !== null
      );

      const order = new Order({
        orderItems: validOrderItemsWithProducts,
        user: userId,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json({ msg: "Order placed", createdOrder });
    }
  } catch (error) {
    console.log(error);
  }
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// get all orders for user
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.body.userId });
  res.status(200).json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  // populating order with user's name and email
  const order = await Order.findById(req.body.id);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// getting all orders for admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.status(200).json({ orders });
});

// stripe payment gatweay

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

export const stripePayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.id);

  // update order as paid
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    await order.save();
  }

  const lineItems = order.orderItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.product.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.ALLOWED_ORIGIN}/orderdetails/${order._id}`,
      cancel_url: `${process.env.ALLOWED_ORIGIN}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating Stripe session");
  }
});
