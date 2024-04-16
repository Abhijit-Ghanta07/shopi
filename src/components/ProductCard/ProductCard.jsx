import React from "react";
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

import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../../services/redux/cart";
import { ToastOpen } from "../../services/redux/Toast";
import useFindProduct from "../../hooks/FindProduct";
// import { addWishlist, removeWishlist } from "../../redux/wishList";

// css
import Styles from "./productCard.module.scss";
import BuyBtn from "../ui/button/BuyBtn";
function ProductCard({ product, width = "" }) {
  return (
    <>
      <Card className={Styles.product__card} style={{ minWidth: width }}>
        <Link to={`/product/${product.id}`} className={Styles.card__link}>
          <CardImg
            src={product?.images[0]}
            className={Styles.card__img}
            onError={(e) => {
              e.target?.offsetParent?.classList.add("d-none");
            }}
            alt="product img"
          />
        </Link>

        <CardBody className="d-flex flex-column justify-content-end py-2">
          <CardSubtitle className={Styles.product__title}>
            {product.title}
          </CardSubtitle>
          {/* <CardText className="text-success">
            {product?.rating?.rate}
            <FaStar />
            By
            {product?.rating?.count}
          </CardText> */}
          <CardText className="small fw-medium m-0">
            <FaDollarSign />
            {product?.price}
          </CardText>
          <Badge
            className="my-2"
            pill
            bg="dark"
            style={{
              width: "fit-content",
              fontSize: ".6rem",
              fontFamily: "popines",
            }}
          >
            {product?.category?.name.toUpperCase()}
          </Badge>

          <div className={Styles.product__btn}>
            <BuyBtn id={product?.id} />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default ProductCard;
