import { createContext, useReducer, useState } from "react";
import CartReducer from "./Cart.js";
import userReducer from "./User.js";
import ProductReducer from "./Product.js";
import wishlistReducer from "./wishList.js";

const initialProduct = [];
const initialCart = [];
const initialUser = {
  user: {},
  loading: false,
  loadFinish: false,
  currentUser: false,
};
const initialWishlist = [];
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
  let value = {
    product: [productState, productDispatch],
    cart: [cartState, cartDispatch],
    user: [userState, userDisapatch],
    wishlist: [wishlistState, wishDispatch],
  };

  return (
    <>
      <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    </>
  );
}
export default ContextStore;
