import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : null,
  cartTotal: localStorage.getItem("cartTotal")
    ? JSON.parse(localStorage.getItem("cartTotal"))
    : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    removeCartItems: (state) => {
      state.cartItems = null;
      localStorage.removeItem("cartItems");
    },
    updateCartTotal: (state, action) => {
      state.cartTotal = action.payload;
      localStorage.setItem("cartTotal", JSON.stringify(action.payload));
    },
  },
});

export const { addCartItems, removeCartItems, updateCartTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
