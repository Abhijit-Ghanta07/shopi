import React from "react";
import { Header } from "../includes/includes";
import { Outlet } from "react-router-dom";

const ErrorPage = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ErrorPage;
