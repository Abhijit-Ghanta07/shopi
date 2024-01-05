import React from "react";
import { Footer, Header } from "../includes/includes";
import { Outlet } from "react-router-dom";
import { Loader, ToastModal } from "../components";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const loading = useSelector((store) => store.loader);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastModal />
      <Loader loading={loading} />
    </>
  );
};

export default ProductPage;
