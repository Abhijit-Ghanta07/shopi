import React from "react";
import { Header } from "../includes/includes.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Loader, ToastModal } from "../components/index.js";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

// styles
import Styles from "./page.module.scss";
const Auth = () => {
  const navigate = useNavigate();
  const loading = useSelector((store) => store.loader);
  return (
    <>
      <Header />
      <Container fluid className="p-0 position-relative">
        <Link className={`${Styles.back__btn} btn `} to={-1} replace>
          <IoArrowBack /> Go Back
        </Link>
        <Outlet />
      </Container>

      <Loader loading={loading} />
      <ToastModal />
    </>
  );
};

export default Auth;
