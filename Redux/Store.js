import { configureStore } from "@reduxjs/toolkit";
import HoodiesSlice from "./Slices/HoodiesSlice";

export const store = configureStore({
  reducer: {
    hoodie: HoodiesSlice,
  },
});
