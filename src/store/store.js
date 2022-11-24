import { configureStore } from "@reduxjs/toolkit";
import { cryptoApiSlice } from "../queries/cryptoApi";
import { newsApiSlice } from "../queries/newsQuery";

export default configureStore({
  reducer: {
    [cryptoApiSlice.reducerPath]: cryptoApiSlice.reducer,
    [newsApiSlice.reducerPath]: newsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApiSlice.middleware)
      .concat(newsApiSlice.middleware),
});
