import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchHoodiesData = createAsyncThunk("hoodie/fetch", async () => {
  const response = await axios.get(
    "https://fast-bayou-02347.herokuapp.com/hoodies"
  );
  // console.log(response);
  return response.data;
});

export const HoodiesSlice = createSlice({
  name: "hoodies",
  initialState: {
    hoodies: [],
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const foundMatched = state.cart.find(
        (item) => item._id === action.payload._id
      );
      console.log(foundMatched);
      if (foundMatched) {
        foundMatched["quantity"] += 1;
      } else {
        action.payload.quantity = 1;
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    emptyCart: (state, action) => {
      state.cart = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHoodiesData.fulfilled, (state, action) => {
      state.hoodies = action.payload;
    });
  },
});

export const { addToCart, removeFromCart, emptyCart } = HoodiesSlice.actions;
export default HoodiesSlice.reducer;
