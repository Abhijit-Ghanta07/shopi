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
function ProductCard({ product, width = "" }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fireId, findId] = useFindProduct();
  const { productsID } = useSelector((store) => store.cart);
  const { userId } = useSelector((store) => store.auth);

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
            className="my-2 shadow"
            pill
            bg="primary"
            style={{
              width: "fit-content",
              fontSize: ".6rem",
              fontFamily: "popines",
            }}
          >
            {product?.category?.name.toUpperCase()}
          </Badge>

          <div className={Styles.buy__btn}>
            {productsID.includes(product.id) ? (
              <Button
                variant="danger"
                className="w-100"
                size="sm"
                onClick={handleRemoveClick.bind(product.id)}
              >
                Remove from Cart
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
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
