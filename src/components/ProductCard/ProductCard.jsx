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
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../../redux/cart";
import { ToastOpen } from "../../redux/Toast";
import useFindProduct from "../../hooks/FindProduct";
import { addWishlist, removeWishlist } from "../../redux/wishList";

// css
import Styles from "./productCard.module.scss";
function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fireId, findId] = useFindProduct();
  const { productsID } = useSelector((store) => store.cart);
  const { userId } = useSelector((store) => store.auth);
  const wishlist = useSelector((store) => store.wishlist);

  // handle addto cart click
  function handleAddClick() {
    if (!userId) {
      return navigate("/auth");
    }
    try {
      dispatch(addItem({ productId: this, userId: userId }));
      dispatch(ToastOpen("Product Added To Cart"));
    } catch (err) {
      console.log(err);
      dispatch(ToastOpen("Something went Wrong"));
    }
  }
  // handle remove click
  function handleRemoveClick() {
    const ID = findId(this);
    if (ID) {
      dispatch(deleteItem({ productId: this, fireId: ID }));
      dispatch(ToastOpen("Product Remove From Cart"));
    }
  }

  return (
    <>
      <Card className={Styles.product__card}>
        {/* {wishlist.includes(product?.id) ? (
          <IoMdHeart
            className={Styles.img__icon}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(removeWishlist(product?.id));
            }}
          />
        ) : (
          <IoIosHeartEmpty
            className={Styles.img__icon}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(addWishlist(product?.id));
            }}
          />
        )} */}

        <Link to={`/product/${product.id}`} className={Styles.card__link}>
          <CardImg
            src={product?.images[0]}
            className={Styles.card__img}
            onError={(e) => {
              e.target.offsetParent.classList.add("d-none");
            }}
          />
        </Link>

        <CardBody className="d-flex flex-column justify-content-end">
          <CardSubtitle className={Styles.product__title}>
            {product.title}
          </CardSubtitle>
          {/* <CardText className="text-success">
            {product?.rating?.rate}
            <FaStar />
            By
            {product?.rating?.count}
          </CardText> */}
          <CardText
            className="small fw-medium m-0"
            style={{ fontFamily: "sans-serif" }}
          >
            <FaDollarSign />
            {product?.price}
          </CardText>
          <Badge
            className="my-2 shadow"
            pill
            bg="warning"
            style={{ width: "fit-content" }}
          >
            {product?.category?.name.toUpperCase()}
          </Badge>

          <div className={Styles.buy__btn}>
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
                variant="primary"
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

export default ProductCard;
