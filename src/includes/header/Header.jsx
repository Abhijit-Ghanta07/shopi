import React, { useState } from "react";
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

import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { MdAccountCircle } from "react-icons/md";
import { GoPasskeyFill } from "react-icons/go";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { IoBagHandleOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { removeuser } from "../../redux/auth";
import { ToastOpen } from "../../redux/Toast";
import { cartEmpty } from "../../redux/cart";
// styles
import avatar from "../../assets/svg/avatar.svg";
import Styles from "./header.module.scss";
function Header() {
  const dispatch = useDispatch();
  // globals states
  const { user, userId } = useSelector((store) => store.auth);
  const { productsID } = useSelector((store) => store.cart);
  const wishlist = useSelector((store) => store.wishlist);
  // components states
  const [show, setShow] = useState(false);
  // logout function
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
        className="shadow-sm position-sticky top-0 bg-light px-2"
        style={{ zIndex: 9 }}
      >
        <Container fluid="xl p-0">
          <Row className="py-2 align-items-center gap-2">
            <Col className="d-flex flex-column text-md-start">
              <Link
                to={"/"}
                replace
                className="text-decoration-none display-6 mb-0 text-dark fw-bold"
              >
                SHOPI
              </Link>
              <p className="small m-0">All Your Needs Are Here.</p>
            </Col>

            <Col>
              <div className="d-flex gap-4 justify-content-between justify-content-md-end">
                {userId && (
                  <Link to={"/order"} className={Styles.link}>
                    <IoBagHandleOutline
                      className={Styles.header__user_icons}
                      size={"1.7rem"}
                    />
                    <span className="fw-bold">Orders</span>
                  </Link>
                )}
                <Link to={"/cart"} className="position-relative fs-6 mt-1">
                  <FaRegHeart className={Styles.header__user_icons} />
                  <Badge bg="danger" pill className={Styles.header__badge}>
                    {wishlist.length}
                  </Badge>
                </Link>

                <Link
                  to={"/cart"}
                  className="position-relative text-decoration-none text-black mt-1"
                >
                  <IoCartOutline
                    className={Styles.header__user_icons}
                    size={"1.8rem"}
                  />
                  <span className={Styles.sm__hide}>Cart</span>
                  <Badge bg="danger" pill className={Styles.header__badge}>
                    {productsID.length}
                  </Badge>
                </Link>
                {/* if user existed then show the profile and dropdown */}
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

                      <Link
                        className={Styles.dropdown__link}
                        to={"/account/change"}
                      >
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
                    className="text-decoration-none text-black"
                  >
                    <img
                      src={avatar}
                      alt="catagories img"
                      className={Styles.rounded__img}
                    />
                    <span className={Styles.sm__hide}>Login</span>
                  </Link>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* modal for comfirm logout method */}
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
