import React, { useState } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import useFindProduct from "../../hooks/FindProduct";
import { deleteItem } from "../../redux/cart";

// scss
import Styles from "./cart.module.scss";
const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [fireId, findId] = useFindProduct();
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  function handleRemoveClick() {
    const ID = findId(this);
    if (ID) {
      dispatch(deleteItem({ productId: this, fireId: ID }));
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="10" sm="6" md="5">
            <Stack direction="horizontal" gap={2}>
              <img
                src={product?.images[0]}
                alt="product-img"
                className={Styles.product__img}
              />
              <Stack direction="vertical">
                <p>{product?.title}</p>
                <Badge style={{ width: "fit-content" }} bg="secondary">
                  {product?.category?.name}
                </Badge>
              </Stack>
            </Stack>
          </Col>
          <Col xs="6" sm="6" md="2">
            <Stack direction="horizontal" gap={1}>
              <Button size="sm">
                <FaPlus />
              </Button>
              <p>{quantity}</p>
              <Button size="sm">
                <FaMinus />
              </Button>
            </Stack>
          </Col>
          <Col xs="6" sm="6" md="2">
            <p className="m-0 fs-5 fw-medium">Price:${total}</p>
            <p className="m-0 text-secondary">${product?.price}.00 Each</p>
          </Col>
          <Col xs="10" sm="6" md="3">
            <Stack direction="horizontal" gap={2}>
              <Button size="sm">
                <FaHeart />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleRemoveClick.bind(product.id)}
              >
                Remove
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartProduct;
