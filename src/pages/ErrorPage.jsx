import React from "react";
import { Header } from "../includes/includes";
import { useRouteError } from "react-router-dom";
import { Error } from "../components";

const ErrorPage = () => {
  const err = useRouteError();
  return (
    <>
      <Header />
      <Error />
    </>
  );
};

export default ErrorPage;
