import React from "react";
import { Header } from "../index.js";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Auth;
