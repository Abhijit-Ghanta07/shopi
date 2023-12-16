import React, { useContext, useState } from "react";
import { Header } from "../includes/includes.js";
import { Outlet } from "react-router-dom";
import Loader, { ToastModal } from "../loader/Loader.jsx";

const Auth = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Loader loading={false} />
      <ToastModal />
    </>
  );
};

export default Auth;
