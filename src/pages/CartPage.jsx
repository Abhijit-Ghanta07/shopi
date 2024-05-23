import React from "react";
import { useSelector } from "react-redux";
import { CartWrapper, CartEmpty } from "../components/cart/cartIndex";
import { Header } from "../includes/includes";
import { Container } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
// styles
import Styles from "./page.module.scss";
import { Link, useLocation } from "react-router-dom";
const Cart = () => {
  const { productsID } = useSelector((store) => store.cart);
  const { state } = useLocation();
  return (
    <>
      <Header />
      <Container fluid className="p-0 position-relative">
        <Link className={`${Styles.back__btn} btn`} to={-1}>
          <IoArrowBack />
          Go Back
        </Link>
        {productsID.length > 0 ? (
          <CartWrapper modalState={state} />
        ) : (
          <CartEmpty />
        )}
      </Container>
    </>
  );
};

export default Cart;
