import React from "react";
import { Header } from "../includes/includes.js";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Footer } from "../includes/includes.js";
import { Container } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
// styles
import Styles from "./page.module.scss";
const Order = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container fluid className="p-0 position-relative">
        <Link
          className={`${Styles.back__btn} btn `}
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoArrowBack /> Go Back
        </Link>
        <Outlet />
      </Container>

      <Footer />
    </>
  );
};

export default Order;
