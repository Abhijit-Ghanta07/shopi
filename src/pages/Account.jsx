import React from "react";
import { Header } from "../includes/includes";
import { Outlet } from "react-router-dom";

const Account = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Account;
