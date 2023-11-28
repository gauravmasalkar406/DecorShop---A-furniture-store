import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import userReducer from "./slices/user.js";
import cartReducer from "./slices/cart.js";
import orderReducer from "./slices/order.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== "production",
});
