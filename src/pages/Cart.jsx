import React from "react";
import { useSelector } from "react-redux";
import { CartWrapper, CartEmpty } from "../cart/cartIndex";

const Cart = () => {
  const { productsID } = useSelector((store) => store.cart);
  return <>{productsID.length > 0 ? <CartWrapper /> : <CartEmpty />}</>;
};

export default Cart;
