import { configureStore } from "@reduxjs/toolkit";
import { authSlice, locationSlice, filterSlice, stufSlice } from "./slice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    location: locationSlice.reducer,
    filter: filterSlice.reducer,
    stuf: stufSlice.reducer,
  },
});
