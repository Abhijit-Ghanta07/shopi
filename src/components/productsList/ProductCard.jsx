import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
} from "react-bootstrap";
import { FaDollarSign } from "react-icons/fa6";
import { StoreContext } from "../../context/store";
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
// css
import Styles from "./productlist.module.scss";
function ProductShow({ product }) {
  const {
    product: [productState],
    cart: [cartState, dispatch],
    wishlist: [wishState, wishDispatch],
  } = useContext(StoreContext);

  function handleAddClick() {
    dispatch({ type: "addToCart", payload: this });
  }
  function handleRemoveClick() {
    dispatch({ type: "deleteFromCart", payload: this });
  }

  return (
    <>
      <Card className={Styles.product__card}>
        {wishState.includes(product?.id) ? (
          <IoMdHeart
            className={Styles.img__icon}
            onClick={(e) => {
              e.stopPropagation();
              wishDispatch({ type: "remove", payload: product.id });
            }}
          />
        ) : (
          <IoIosHeartEmpty
            className={Styles.img__icon}
            onClick={(e) => {
              e.stopPropagation();
              wishDispatch({ type: "add", payload: product.id });
            }}
          />
        )}

        <Link to={`product/${product.id}`} className={Styles.card__link}>
          <CardImg src={product?.images[0]} className={Styles.card__img} />
        </Link>

        <CardBody>
          <CardSubtitle>{product.title}</CardSubtitle>
          {/* <CardText className="text-success">
            {product?.rating?.rate}
            <FaStar />
            By
            {product?.rating?.count}
          </CardText> */}
          <CardText className="fw-medium m-0">
            <FaDollarSign />
            {product?.price}
          </CardText>
          <Badge className="my-2" pill bg="secondary">
            {product?.category?.name}
          </Badge>

          <div className="d-flex ">
            {cartState.includes(product.id) ? (
              <Button
                variant="danger"
                className="w-100"
                onClick={handleRemoveClick.bind(product.id)}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                variant="success"
                className="w-100"
                onClick={handleAddClick.bind(product.id)}
              >
                Add To Cart
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ProductShow;
