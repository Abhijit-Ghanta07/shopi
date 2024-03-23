import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

import useFindProduct from "../../hooks/FindProduct";
import { deleteItem } from "../../services/redux/cart";
import { Link } from "react-router-dom";
import { addWishlist, removeWishlist } from "../../services/redux/wishList";
// scss
import Styles from "./cart.module.scss";

const CartProduct = ({ product, setTotalPrice }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((store) => store.wishlist);
  const [fireId, findId] = useFindProduct();
  const [quantity, setQuantity] = useState(1);
  const [wishAdd, setWishAdd] = useState(false);

  function handleRemoveClick() {
    const ID = findId(this);
    if (ID) {
      dispatch(deleteItem({ productId: this, fireId: ID }));
    }
  }
  useEffect(() => {
    if (wishList.length > 0) {
      wishList.forEach((item) => {
        if (item == product?.id) {
          setWishAdd(true);
        }
      });
    } else {
      setWishAdd(false);
    }
  }, [wishList]);
  useEffect(() => {
    setTotalPrice((prev) => [...prev, product.price]);
  }, []);

  function handleWishlistClick() {
    if (wishAdd) {
      dispatch(removeWishlist(this));
      setWishAdd(false);
    } else {
      dispatch(addWishlist(this));
    }
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs="10" sm="6" md="5">
            <Stack direction="horizontal" gap={2}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product?.images[0]}
                  alt="product-img"
                  className={Styles.product__img}
                />
              </Link>

              <Stack direction="vertical">
                <p className="fw-bold">{product?.title}</p>
                <Badge style={{ width: "fit-content" }} bg="secondary">
                  {product?.category?.name}
                </Badge>
              </Stack>
            </Stack>
          </Col>
          <Col xs="6" sm="6" md="2">
            <Stack direction="horizontal" gap={1}>
              {/* <Button
                size="sm"
                onClick={() => {
                  setQuantity((q) => q + 1);
                }}
              >
                <FaPlus />
              </Button> */}
              <p className="fw-medium ">Quantity:{quantity}</p>
              {/* <Button
                size="sm"
                onClick={() => {
                  if (quantity > 0) {
                    return setQuantity((q) => q - 1);
                  }
                }}
              >
                <FaMinus />
              </Button> */}
            </Stack>
          </Col>
          <Col xs="6" sm="6" md="2">
            <p className="m-0 fs-5 fw-bold">Price:${product.price}</p>
            {/* <p className="m-0 text-secondary">${product?.price}.00 Each</p> */}
          </Col>
          <Col xs="10" sm="6" md="3">
            <Stack direction="horizontal" gap={2}>
              <button
                onClick={handleWishlistClick.bind(product.id)}
                className={Styles.wishBtn}
              >
                <FaHeart color={wishAdd ? "red" : "#000"} />
              </button>
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
