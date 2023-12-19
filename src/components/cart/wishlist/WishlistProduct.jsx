import React, { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
} from "react-bootstrap";
import Styles from "./wishlist.module.scss";
import { useDispatch } from "react-redux";
import { addWishlist } from "../../../context/wishList";
const WishlistProduct = ({ product }) => {
  const dispatch = useDispatch();
  function handleRemoveClick() {
    dispatch(addWishlist(this));
  }
  return (
    <>
      <Card className={Styles.product__card}>
        <CardImg src={product?.images[0]} className="card-img" />
        <CardBody>
          <CardTitle>{product.title}</CardTitle>
          <CardText>Price:${product.price}</CardText>
          <CardText className="small text-secondary">
            {product.description}
          </CardText>
          <div className="d-flex gap-3">
            <Button
              variant="danger"
              onClick={handleRemoveClick.bind(product.id)}
            >
              Remove
            </Button>
            <Button variant="warning">Add Cart</Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default WishlistProduct;
