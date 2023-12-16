import { createContext, useEffect, useReducer, useState } from "react";
import CartReducer from "./Cart.js";
import userReducer from "./User.js";
import ProductReducer from "./Product.js";
import wishlistReducer from "./wishList.js";
import ToastReducer from "./Toast.js";

const initialProduct = [];
const initialUser = {
  userId: "",
  user: {},
  loading: false,
  loadFinish: false,
  currentUser: false,
};
const initialCart = {
  productsID: [],
  firestoreProducts: [],
};
const initialWishlist = [];
const initialToast = {
  message: "",
  show: false,
};

// JSON.parse(localStorage.getItem("user"))
// initialize the context
export const StoreContext = createContext(null);

// make function to use the reducers and return the state and dispatch to children
function ContextStore({ children }) {
  const [productState, productDispatch] = useReducer(
    ProductReducer,
    initialProduct
  );
  const [cartState, cartDispatch] = useReducer(CartReducer, initialCart);
  const [userState, userDisapatch] = useReducer(userReducer, initialUser);
  const [wishlistState, wishDispatch] = useReducer(
    wishlistReducer,
    initialWishlist
  );
  const [toastState, toastDispatch] = useReducer(ToastReducer, initialToast);

  let value = {
    product: [productState, productDispatch],
    cart: [cartState, cartDispatch],
    user: [userState, userDisapatch],
    wishlist: [wishlistState, wishDispatch],
    toast: [toastState, toastDispatch],
  };

  return (
    <>
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    </>
  );
}
export default ContextStore;
