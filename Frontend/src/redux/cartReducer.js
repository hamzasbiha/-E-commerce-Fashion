import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.product.find(
        (item) => item.idprodcuts === action.payload.idprodcuts
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.product.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.product = state.product.filter(
        (item) => item.idprodcuts !== action.payload
      );
    },
    restCart: (state) => {
      state.product = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, restCart } = cartSlice.actions;

export default cartSlice.reducer;
