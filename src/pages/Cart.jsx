import React from "react";
import { useSelector } from "react-redux";
import { CartWrapper, CartEmpty } from "../components/cart/cartIndex";
import { Header } from "../includes/includes";

const Cart = () => {
  const { productsID } = useSelector((store) => store.cart);
  return (
    <>
      <Header />
      {productsID.length > 0 ? <CartWrapper /> : <CartEmpty />}
    </>
  );
};

export default Cart;
