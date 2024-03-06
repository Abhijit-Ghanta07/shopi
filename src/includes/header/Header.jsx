import React, { useState } from "react";

import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Col,
  Container,
  DropdownButton,
  DropdownDivider,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import { IoBagCheckOutline } from "react-icons/io5";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { RiLogoutCircleRFill } from "react-icons/ri";
// styles
import Styles from "./header.module.scss";
import avatar from "../../assets/svg/avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { removeuser } from "../../redux/auth";
import { ToastOpen } from "../../redux/Toast";
import { cartEmpty } from "../../redux/cart";
function Header() {
  const dispatch = useDispatch();
  const { user, userId } = useSelector((store) => store.auth);
  const { productsID } = useSelector((store) => store.cart);
  const wishlist = useSelector((store) => store.wishlist);
  const [show, setShow] = useState(false);
  async function logout(params) {
    await signOut(auth);
    dispatch(removeuser());
    dispatch(cartEmpty());
    dispatch(ToastOpen("Youre Are Logged Out"));
  }

  const handleLogout = async () => {
    setShow(false);
    await logout();
  };

  return (
    <>
      <Container
        fluid
        className="shadow-sm position-sticky top-0 bg-light"
        style={{ zIndex: 9 }}
      >
        <Container fluid="xl p-0">
          <Row className="py-2 align-items-center gap-2">
            <Col className="d-flex flex-column text-center text-md-start">
              <Link
                to={"/"}
                className="text-decoration-none fs-4 text-dark fw-bold"
              >
                SHOPI
              </Link>
              <p className="small m-0 ">All Your Needs Are Here.</p>
            </Col>

            <Col>
              <div className="d-flex gap-4 justify-content-end">
                {userId && (
                  <Link to={"/order"} className={Styles.link}>
                    <IoBagCheckOutline className={Styles.header__user_icons} />
                    My Orders
                  </Link>
                )}

                {userId ? (
                  <>
                    <DropdownButton
                      id="dropdown-basic-button "
                      className={Styles.dropdown}
                      title={
                        <>
                          <img
                            src={user.photoURL}
                            alt="catagories img"
                            className={Styles.rounded__img}
                          />

                          <p className="m-0 fs-6 text-capitalize">
                            {user.displayName.split(" ")[0]}
                          </p>
                        </>
                      }
                    >
                      <Link className={Styles.dropdown__link} to={"/account"}>
                        <MdAccountCircle fontSize="1rem" />
                        Account
                      </Link>

                      <DropdownDivider />

                      <Link className={Styles.dropdown__link}>
                        <GoPasskeyFill fontSize="1rem" />
                        Change Password
                      </Link>
                      <DropdownDivider />
                      <Link
                        className={Styles.dropdown__link}
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        <RiLogoutCircleRFill fontSize="1rem" />
                        Logout
                      </Link>
                    </DropdownButton>
                  </>
                ) : (
                  <Link
                    to={"/auth"}
                    className="text-decoration-none text-black mt-2"
                  >
                    <img
                      src={avatar}
                      alt="catagories img"
                      className={Styles.rounded__img}
                    />
                    Login
                  </Link>
                )}
                <Link to={"/cart"} className="position-relative fs-6 mt-2">
                  <FaRegHeart className={Styles.header__user_icons} />
                  <Badge bg="danger" pill className={Styles.header__badge}>
                    {wishlist.length}
                  </Badge>
                </Link>

                <Link
                  to={"/cart"}
                  className="position-relative text-decoration-none text-black mt-2"
                >
                  <IoCartOutline className={Styles.header__user_icons} />
                  <span className="fw-medium ">Cart</span>
                  <Badge bg="danger" pill className={Styles.header__badge}>
                    {productsID.length}
                  </Badge>
                </Link>
              </div>
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
    </>
  );
}

export default Header;
