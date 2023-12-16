import React, { useContext, useState } from "react";
import { Header } from "../includes/includes.js";
import { Outlet } from "react-router-dom";
import Loader, { ToastModal } from "../loader/Loader.jsx";
import { useSelector } from "react-redux";

const Auth = () => {
  const { loading } = useSelector((store) => store.auth);
  return (
    <>
      <Header />
      <Outlet />
      <Loader loading={loading} />
      <ToastModal />
    </>
  );
};

export default Auth;
