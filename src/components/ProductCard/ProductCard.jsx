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
    } catch (err) {
      console.log(err);
    }
  }
  // handle remove click
  function handleRemoveClick() {
    const ID = findId(this);
    if (ID) {
      dispatch(deleteItem({ productId: this, fireId: ID }));
    }
  }

  return (
    <>
      <Card className={Styles.product__card}>
        {wishlist.includes(product?.id) ? (
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

export default ProductCard;
