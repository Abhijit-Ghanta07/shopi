import React from "react";
import { Link } from "react-router-dom";
// scss
import Styles from "./cart.module.scss";
import { Col, Container, Row } from "react-bootstrap";

const CartEmpty = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md="12">
            <div className={Styles.card}>
              <div className={Styles.card__header}>
                <h5 className="text-center fw-bold fs-4">Shopping Cart</h5>
              </div>
              <div className={Styles.card__body}>
                <Col sm="12" className="empty-cart-cls text-center">
                  <img
                    src="https://i.imgur.com/dCdflKN.png"
                    width="130"
                    height="130"
                    className="img-fluid mb-4 mr-3"
                  />
                  <h3>
                    <strong>Your Cart is Empty</strong>
                  </h3>
                  <h4>Add something to make me happy :)</h4>
                  <Link
                    href="#"
                    className="btn btn-primary cart-btn-transform m-3"
                    data-abc="true"
                    to={"/"}
                  >
                    Continue Shopping
                  </Link>
                </Col>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartEmpty;
