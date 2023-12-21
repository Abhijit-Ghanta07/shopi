import React from "react";
import { Footer, Header } from "../includes/includes";
import { Outlet } from "react-router-dom";

const ProductPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ProductPage;
