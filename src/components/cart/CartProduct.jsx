import React, { useContext } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa6";
import { StoreContext } from "../../context/store";
import { FaDollarSign } from "react-icons/fa6";
import Styles from "./cart.module.scss";

const CartProduct = ({ product }) => {
  const {
    cart: [, dispatch],
    user: [userState],
  } = useContext(StoreContext);

  function handleRemoveClick() {
    dispatch({ type: "deleteFromCart", payload: this });
    // deleteFromFireStore(this, userState.userId);
  }
  return (
    <>
      <Card className={Styles.product__card}>
        <CardImg src={product?.images[0]} className={Styles.card__img} />
        <CardBody>
          <CardTitle>{product.title}</CardTitle>
          {/* <CardText className="text-success">
            {product?.rating?.rate}
            <FaStar />
            By
            {product?.rating?.count}
          </CardText> */}
          <CardText className="fw-medium fs-5">
            <FaDollarSign />
            {product.price}
          </CardText>
          <div className="d-flex gap-3">
            <Button
              variant="danger"
              onClick={handleRemoveClick.bind(product.id)}
            >
              Remove from Cart
            </Button>
            <Button variant="warning">Buy Now</Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default CartProduct;
