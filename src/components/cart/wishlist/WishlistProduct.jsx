import React, { useContext } from "react";
import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { addWishlist, removeWishlist } from "../../../redux/wishList";

// scss
import Styles from "./wishlist.module.scss";
import { Link } from "react-router-dom";

const WishlistProduct = ({ product }) => {
  const dispatch = useDispatch();
  function handleRemoveClick() {
    dispatch(addWishlist(this));
  }

  function handleRemoveClick() {
    dispatch(removeWishlist(this));
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
                <p>{product?.title}</p>
                <Badge style={{ width: "fit-content" }} bg="secondary">
                  {product?.category?.name}
                </Badge>
              </Stack>
            </Stack>
          </Col>

          <Col xs="10" sm="6" md="5" className="py-3">
            <p className="small">Price:${product.description}</p>
            {/* <p className="m-0 text-secondary">${product?.price}.00 Each</p> */}
            <Button
              variant="danger"
              size="sm"
              onClick={handleRemoveClick.bind(product.id)}
            >
              Remove
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WishlistProduct;
