// src/app/store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import cartReducer from "./cart";
import authReducer from "./auth";
import productReducer from "./product.js";
import toastReducer from "./Toast";
import wishListReducer from "./wishList";
import loaderReducer from "./loader";
import categoryReducer from "./category";

// const customizedMiddleware = getDefaultMiddleware({
//   serializableCheck: {
//     // Ignore non-serializable values for specific paths
//     ignoredActionPaths: ["payload.0.timestamp"],
//     ignoredPaths: ["payload.0.timestamp"],
//   },
// });
const persistConfig = {
  key: "root",
  storage: sessionStorage,
};
// combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  product: productReducer,
  toast: toastReducer,
  loader: loaderReducer,
  wishlist: wishListReducer,
  category: categoryReducer,
});
// defien persisted store
const persistedReducer = persistReducer(persistConfig, rootReducer);

// define store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export stores
const persistedStore = persistStore(store);

export { store, persistedStore };
