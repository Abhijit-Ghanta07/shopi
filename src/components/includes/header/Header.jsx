import React, { useContext, useEffect, useMemo, useState } from "react";

import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Badge,
  Col,
  Container,
  Dropdown,
  DropdownHeader,
  DropdownMenu,
  DropdownToggle,
  FormControl,
  Row,
} from "react-bootstrap";
import { IoBagCheckOutline } from "react-icons/io5";
import { StoreContext } from "../../../context/store";
import fetchData from "../../../api/api";
import { signOut } from "firebase/auth";
import { auth } from "../../../utils/firebase";

// styles
import Styles from "./header.module.scss";
import Banner from "../banner/Banner";
import avatar from "../../../assets/svg/avatar.svg";
function Header() {
  const {
    cart: [cartState],
    user: [userState, userDispatch],
    wishlist: [wishState],
  } = useContext(StoreContext);
  const [user, setUser] = useState({});
  async function logout(params) {
    console.log("click");
    const res = await signOut(auth);
    userDispatch({ type: "removeuser" });
  }
  useEffect(() => {
    setUser(userState.user);
  }, [userState.currentUser]);
  return (
    <>
      <Container
        fluid
        className="shadow-sm position-sticky top-0 z-3"
        style={{ background: "#fff" }}
      >
        <Container fluid="xl">
          <Row className="py-2 align-items-center">
            <Col className="d-flex flex-column">
              <Link
                to={"/"}
                className="text-decoration-none fs-5 text-black fw-medium"
              >
                Shopi
              </Link>
              <p className="small text-secondary m-0 ">
                All Your Needs Are Here.
              </p>
              {/* <Dropdown className="py-3 ">
              <DropdownToggle className="text-black bg-body border-0">
                Catagories
              </DropdownToggle>
              <DropdownMenu>
                {catagories &&
                  catagories.map((catagory, i) => {
                    return (
                      <Link
                        to={`category/${catagory?.id}`}
                        key={i + 1}
                        className="text-capitalize dropdown-item"
                      >
                        {catagory?.name}
                      </Link>
                    );
                  })}
              </DropdownMenu>
            </Dropdown> */}
            </Col>
            {/* 
          <Col>
            <FormControl onChange={handleSubmit} />
          </Col> */}

            <Col>
              <div className="d-flex gap-4 justify-content-end">
                {userState.currentUser && (
                  <Link to={"/order"} className={Styles.link}>
                    <IoBagCheckOutline className={Styles.header__user_icons} />
                    My orders
                  </Link>
                )}

                {userState.currentUser ? (
                  <>
                    <Link className="d-flex gap-2 align-items-center text-decoration-none text-black">
                      <img
                        src={user.photoURL}
                        alt="catagories img"
                        className={Styles.rounded__img}
                        onClick={logout}
                      />
                      <p className="m-0">{user.displayName}</p>
                    </Link>
                  </>
                ) : (
                  <Link to={"/auth"}>
                    <img
                      src={avatar}
                      alt="catagories img"
                      className={Styles.rounded__img}
                      onClick={logout}
                    />
                  </Link>
                )}
                <Link to={"wishlist"} className="position-relative">
                  <FaRegHeart className={Styles.header__user_icons} />
                  <Badge bg="danger" pill className={Styles.header__badge}>
                    {wishState?.length}
                  </Badge>
                </Link>

                <Link
                  to={"/cart"}
                  className="position-relative text-decoration-none text-black"
                >
                  <IoCartOutline className={Styles.header__user_icons} />
                  <span className="fw-medium">Cart</span>
                  <Badge bg="danger" pill className={Styles.header__badge}>
                    {cartState?.length}
                  </Badge>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Header;
