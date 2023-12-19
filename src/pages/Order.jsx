import React from "react";
import { Header } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { Footer } from "../layouts/layout";

const Order = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Order;
