import { configureStore } from "@reduxjs/toolkit";
import { authSlice, locationSlice, filterSlice } from "./slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    location: locationSlice.reducer,
    filter: filterSlice.reducer,
  },
});
