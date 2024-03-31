import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Category, Loader, ToastModal } from "../components";
import { IoArrowBack } from "react-icons/io5";
// style
import style from "./page.module.scss";
import { Footer, Header } from "../includes/includes";
import { useSelector } from "react-redux";
const CategoryPage = () => {
  const loading = useSelector((store) => store.loader);
  return (
    <>
      <Header />

      <Container fluid className="p-0 position-relative">
        <Link className={`${style.back__btn} btn`} to={"/"}>
          <IoArrowBack />
          Go Back
        </Link>
        <Category />
      </Container>
      <Footer />
      <ToastModal />
      <Loader loading={loading} />
    </>
  );
};

export default CategoryPage;
