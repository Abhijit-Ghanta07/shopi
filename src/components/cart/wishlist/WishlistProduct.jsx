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
const WishlistProduct = ({ product }) => {
  // function handleRemoveClick() {
  //   dispatch({ type: "remove", payload: this });
  // }
  return (
    <>
      <Card className={Styles.product__card}>
        <CardImg src={product?.images[0]} className="card-img" />
        <CardBody>
          <CardTitle>{product.title}</CardTitle>
          {/* <CardText className="text-success">
            {product?.rating?.rate}
            <FaStar />
            By
            {product?.rating?.count}
          </CardText> */}
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
