import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {},
  },
  reducers: {
    startFetching: (state, action) => {
      state.products = action.payload;
    },
    dataFetched: (state, action) => {
      state.products = action.payload;
    },
    errorFetching: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { fetchData } = productSlice.actions;
export default productSlice.reducer;
