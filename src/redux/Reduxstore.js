// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import authReducer from "./auth";
import productReducer from "./product";
import toastReducer from "./Toast";
import wishListReducer from "./wishList";

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: {
//     // Ignore non-serializable values for specific paths
//     ignoredActionPaths: ["payload.0.timestamp"],
//     ignoredPaths: ["payload.0.timestamp"],
//   },
// });

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    toast: toastReducer,
    wishlist: wishListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
