import React from "react";
import { Header } from "../includes/includes.js";
import { Outlet } from "react-router-dom";
import { Footer } from "../includes/includes.js";

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
