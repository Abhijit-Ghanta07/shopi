import React, { useState } from "react";
import { Header } from "../includes/includes";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
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
// scss
import Styles from "./page.module.scss";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeuser } from "../redux/auth";
import { ToastOpen } from "../redux/Toast";
import { cartEmpty } from "../redux/cart";

const Account = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((store) => store.loader);
  const { user } = useSelector((store) => store.auth);
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
        <Link to={"/"} className={`${Styles.back__btn} btn `}>
          <IoArrowBack /> Go Back
        </Link>
        <Container className="mt-3 py-5">
          <Row className="gap-4">
            <Col sm="3" className="py-3">
              <ListGroup as={"ul"}>
                <ListGroupItem active>
                  <Link className={`${Styles.links__active}`} to={"/account"}>
                    Profile{" "}
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link to={"order"} className={`${Styles.links} text-primary`}>
                    My Orders{" "}
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link
                    to={
                      user?.providerId == "password"
                        ? "change"
                        : (e) => {
                            e.preventDefault(console.log("not route"));
                          }
                    }
                    className={`${Styles.links} text-primary`}
                  >
                    Change Password
                  </Link>
                </ListGroupItem>
                <ListGroupItem>
                  <Link
                    className={`${Styles.links} text-primary`}
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
      </Container>
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

export default Account;
