import { configureStore } from "@reduxjs/toolkit";
import { authSlice, locationSlice } from "./slice";

export const store = configureStore({
    reducer: { auth: authSlice.reducer, location: locationSlice.reducer },
  });