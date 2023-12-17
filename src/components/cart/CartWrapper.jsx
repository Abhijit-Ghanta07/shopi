import React, { useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  DropdownDivider,
  Row,
  Stack,
} from "react-bootstrap";
import { CartProduct, WishList } from "./cartIndex";

import { useSelector } from "react-redux";

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

  return (
    <>
      <Container fluid="xl" className="mb-4">
        <h3 className="p-2 fw-bold">Shopping Cart</h3>
        <Row className="gap-3">
          <Col md="8" className="order-2 order-md-1">
            <Card>
              <Row className="p-3">
                <Col xs="5">Product</Col>
                <Col xs="2">Quantity</Col>
                <Col xs="2" className="text-start">
                  Price
                </Col>
                <Col xs="3"></Col>
              </Row>
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
                  <p>card</p>
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
