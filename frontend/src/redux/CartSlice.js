import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      state.cartItems = action.payload ;
    },

    addCartItem: (state, action) => {
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }
      state.cartItems.push(action.payload);
    },

    removeCartItemFromStore: (state, action) => {
      if (!Array.isArray(state.cartItems)) {
        state.cartItems = [];
      }
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setCartItem, addCartItem, removeCartItemFromStore } =
  CartSlice.actions;

export default CartSlice.reducer;
