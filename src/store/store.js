import { configureStore } from "@reduxjs/toolkit";
import { cryptoApiSlice } from "../queries/cryptoApi";

export default configureStore({
  reducer: {
    [cryptoApiSlice.reducerPath]: cryptoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApiSlice.middleware),
});
