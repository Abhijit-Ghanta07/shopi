import React, { useState } from "react";
import { Header } from "../includes/includes";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import { IoArrowBack } from "react-icons/io5";
import { Loader, ToastModal } from "../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AccountSidebarLinks } from "../constants/constants.js";
// scss
import Styles from "./page.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase/firebase";
import { removeuser } from "../services/redux/auth";
import { ToastOpen } from "../services/redux/Toast";
import { cartEmpty } from "../services/redux/cart";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((store) => store.loader);
  // const { user } = useSelector((store) => store.auth);
  const [show, setShow] = useState(false);
  const handleLogout = async () => {
    const res = await signOut(auth);
    dispatch(removeuser());
    dispatch(cartEmpty());
    dispatch(ToastOpen("Youre Are Logged Out"));
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container fluid className="p-0 position-relative">
        <Link to="/" replace className={`${Styles.back__btn} btn `}>
          <IoArrowBack /> Go Back
        </Link>
      </Container>
      {/* sidebar components */}
      <AccountSidebar linksArr={AccountSidebarLinks} setShow={setShow} />

      {/* modal for confirm logout  */}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <ModalHeader closeButton>
          <ModalTitle>Confirm Logout</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p className="text-danger fw-bold fs-4">Are Your Sure to Logout</p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="info"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
      <ToastModal />
      <Loader loading={loading} />
    </>
  );
};

const AccountSidebar = ({ linksArr, setShow }) => {
  const { pathname } = useLocation();
  let endPath = pathname.split("/")[2];

  return (
    <>
      <Container className="mt-3 py-5">
        <Row className="gap-4">
          <Col sm="3" className="py-3">
            <ListGroup as={"ul"}>
              {linksArr.map((linkItem, index) => {
                return (
                  <ListGroupItem
                    key={index}
                    active={
                      endPath == linkItem.link || pathname == linkItem.link
                        ? true
                        : false
                    }
                  >
                    <Link
                      className={
                        endPath == linkItem.link || pathname == linkItem.link
                          ? Styles.links__active
                          : Styles.links
                      }
                      to={linkItem.link}
                    >
                      {linkItem.title}
                    </Link>
                  </ListGroupItem>
                );
              })}

              <ListGroupItem>
                <Link
                  className={`${Styles.links} text-primary`}
                  to={""}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Logout
                </Link>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col sm="8">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Account;
