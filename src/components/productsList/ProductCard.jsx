import React, { useContext, useEffect, useMemo, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
// css
import Styles from "./productlist.module.scss";
import { addCartItem, deleteCartItems } from "../../utils/fireStore";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteFromFire, deleteProduct } from "../../context/cart";
function ProductShow({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productsID, firestoreProducts } = useSelector((store) => store.cart);
  const { userId } = useSelector((store) => store.auth);
  async function handleAddClick() {
    if (!userId) {
      return navigate("/auth");
    }
    try {
      const id = await addCartItem(this, userId);
      if (id) {
        dispatch(addProduct({ productId: this, quantity: 1, fireId: id }));
      }
    } catch (err) {
      console.log(err);
    }
  }
  function handleRemoveClick() {
    const fireId = findId(this);
    if (fireId) {
      deleteCartItems(fireId).then(() => {
        dispatch(deleteProduct(this));
        dispatch(deleteFromFire(fireId));
      });
    }
  }
  function findId(productId) {
    let product = firestoreProducts.find((item) => item.productId == productId);
    return product.fireId;
  }

  // const memoCart = useMemo(() => {
  //   return cartState;
  // }, [cartState]);

  return (
    <>
      <Card className={Styles.product__card}>
        {/* {wishState.includes(product?.id) ? (
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
        )} */}

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
            {productsID.includes(product.id) ? (
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
