import React, { useContext, useState } from "react";
import { Header } from "../includes/includes.js";
import { Outlet } from "react-router-dom";
import Loader, { ToastModal } from "../loader/Loader.jsx";
import { StoreContext } from "../../context/store.jsx";

const Auth = () => {
  const {
    user: [userstate],
  } = useContext(StoreContext);

  return (
    <>
      <Header />
      <Outlet />
      <Loader loading={userstate.loading} />
      <ToastModal />
    </>
  );
};

export default Auth;
