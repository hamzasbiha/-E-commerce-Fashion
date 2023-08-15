import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admin: false,
  },
  reducers: {
    added: (state, action) => {
      state.admin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { added } = adminSlice.actions;

export default adminSlice.reducer;
