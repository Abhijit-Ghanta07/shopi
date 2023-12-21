import React, { useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  DropdownDivider,
  FormControl,
  Row,
  Stack,
} from "react-bootstrap";
import { CartEmpty, CartProduct, WishList } from "./cartIndex";
import { IoArrowBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import payment from "../../assets/images/payment.jpg";

import Styles from "./cart.module.scss";
const CartWrapper = () => {
  const { productData } = useSelector((store) => store.product);
  const { productsID } = useSelector((store) => store.cart);
  let fillteredItem = useMemo(() => {
    return productData.filter((product, i) => productsID?.includes(product.id));
  }, [productsID]);

  const totalPrice = () => {
    return fillteredItem.reduce((total, currentItem) => {
      return total + currentItem.price;
    }, 0);
  };
  if (!fillteredItem.length) {
    return <CartEmpty />;
  }

  return (
    <>
      <Link to={"/"} className={`${Styles.back__btn} btn`}>
        <IoArrowBack />
        Go Back
      </Link>
      <Container fluid="xl" className="mb-4">
        <h3 className="p-2 fw-bold">Shopping Cart</h3>
        <Row className="gap-3">
          <Col md="8" className="order-2 order-md-1">
            <Card className="p-3">
              {/* <Row className="p-3">
                <Col xs="5">Product</Col>
                <Col xs="2">Quantity</Col>
                <Col xs="2" className="text-start">
                  Price
                </Col>
                <Col xs="3"></Col>
              </Row> */}
              <Stack direction="vertical" className="gap-3">
                {fillteredItem.length > 0 &&
                  fillteredItem.map((item) => (
                    <CartProduct key={item?.id} product={item} />
                  ))}
              </Stack>
              <WishList />
            </Card>
          </Col>
          <Col md="3" className="order-1 order-md-2">
            <Card className="p-2">
              <CardTitle>Order Now</CardTitle>
              <hr />
              <CardBody>
                <p>Have A Coupon Code:</p>
                <FormControl
                  className="mb-2"
                  placeholder="enter coupon  here"
                />

                <p className="d-flex justify-content-between">
                  <span>Total Price:</span> <span>${totalPrice()}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Delivery Charge:</span> <span>Free</span>
                </p>
                <Button variant="info" className="w-100">
                  Checkout Now
                </Button>
                <hr />
                <Stack direction="horizontal">
                  <img
                    src={payment}
                    alt="cards"
                    className={Styles.payment__img}
                  />
                </Stack>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartWrapper;
