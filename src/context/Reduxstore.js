// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import authReducer from "./auth";
import productReducer from "./product";
import toastReducer from "./Toast";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    toast: toastReducer,
  },
});

export default store;
