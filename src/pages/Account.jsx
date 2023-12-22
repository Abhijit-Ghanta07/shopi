import React from "react";
import { Header } from "../includes/includes";
import { Link, Outlet } from "react-router-dom";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { Loader, ToastModal } from "../components/loader/Loader";
// scss
import Styles from "./page.module.scss";
import { useSelector } from "react-redux";

const Account = () => {
  const { loading } = useSelector((store) => store.auth);
  return (
    <>
      <Header />
      <Container fluid>
        <Link to={"/"} className={`${Styles.back__btn} btn `}>
          <IoArrowBack /> Go Back
        </Link>
        <Container className="mt-4">
          <Row className="gap-4">
            <Col sm="3" className="py-3">
              <ListGroup as={"ul"}>
                <ListGroupItem active>Profile</ListGroupItem>
                <ListGroupItem>My Orders</ListGroupItem>
                <ListGroupItem>Change Password</ListGroupItem>
                <ListGroupItem>Logout</ListGroupItem>
              </ListGroup>
            </Col>
            <Col sm="8">
              <Outlet />
            </Col>
          </Row>
        </Container>
      </Container>
      <ToastModal />
      <Loader loading={loading} />
    </>
  );
};

export default Account;
