import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  Container,
  Row,
  Badge,
  Stack,
  CardTitle,
  ButtonGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../../services/redux/cart";
import { IoArrowBack } from "react-icons/io5";
import useFindProduct from "../../hooks/FindProduct";
import { FaDollarSign } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
// scss
import Styles from "./product.module.scss";
import { addWishlist, removeWishlist } from "../../services/redux/wishList";
function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fireId, findId] = useFindProduct();
  const { productData } = useSelector((store) => store.product);
  const { productsID } = useSelector((store) => store.cart);
  const { userId } = useSelector((store) => store.auth);
  const wishlist = useSelector((store) => store.wishlist);
  // local States
  const [imgState, setImgState] = useState(0);
  // filltered items
  let fillterdItem = useMemo(() => {
    return productData.find((item) => {
      return item.id == id;
    });
  }, [id]);
  let relativeProducts = useMemo(() => {
    return productData.filter((item) => {
      return (
        item.category?.id == fillterdItem.category.id &&
        item.id !== fillterdItem.id
      );
    });
  }, [id]);

  // handle add to cart click
  function handleAddClick() {
    if (!userId) {
      return navigate("/auth");
    }
    dispatch(addItem({ productId: this, userId: userId }));
  }
  // handle remove from cart click
  function handleRemoveClick() {
    const ID = findId(this);
    if (ID) {
      dispatch(deleteItem({ productId: this, fireId: ID }));
    }
  }

  const sizeArr = ["M", "L", "XL", "XXL"];
  return (
    <>
      <Link className={`${Styles.back__btn} btn`} to={-1}>
        <IoArrowBack />
        Go Back
      </Link>
      <Container className="my-5 h-100">
        <Row>
          <Col>
            {fillterdItem && (
              <Card className="p-3 gap-3 flex-sm-row">
                <Col xs="12" sm="4">
                  <img
                    src={fillterdItem?.images[imgState]}
                    className={Styles.card__img}
                  />
                </Col>
                <Col xs="12" sm="8">
                  <CardBody className="p-0 px-3">
                    <CardTitle className={Styles.product__title}>
                      {fillterdItem.title}
                    </CardTitle>
                    <Badge
                      className="my-2 shadow"
                      pill
                      bg="primary"
                      style={{ fontFamily: "jhalMuri" }}
                    >
                      {fillterdItem?.category?.name.toUpperCase()}
                    </Badge>
                    {/* <CardText>{fillterdItem.description}</CardText> */}
                    <CardText className={Styles.product__price__title}>
                      Price: <BsCurrencyDollar />
                      {fillterdItem?.price}
                    </CardText>
                    <CardText className={Styles.product__image__title}>
                      IMAGES:
                    </CardText>
                    <Stack direction="horizontal" gap={1} className="mb-2">
                      {fillterdItem?.images.map((img, i) => (
                        <img
                          src={img}
                          key={i}
                          className={Styles.slide__img}
                          loading="lazy"
                          onClick={() => {
                            setImgState(i);
                          }}
                        />
                      ))}
                    </Stack>
                    <CardText className={Styles.product__size__title}>
                      SIZE:
                    </CardText>

                    <ButtonGroup className="mb-3">
                      {sizeArr.map((size, index) => (
                        <Button
                          key={index}
                          size=""
                          variant="secondary"
                          onClick={(e) => {
                            e.target.classList.toggle("active");
                          }}
                        >
                          {size}
                        </Button>
                      ))}
                    </ButtonGroup>

                    <div className="d-flex gap-3">
                      {productsID.includes(fillterdItem.id) ? (
                        <Button
                          variant="danger"
                          onClick={handleRemoveClick.bind(fillterdItem.id)}
                        >
                          Remove from Cart
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          onClick={handleAddClick.bind(fillterdItem.id)}
                        >
                          Add To Cart
                        </Button>
                      )}
                      <Button variant="warning">Buy Now</Button>
                    </div>
                  </CardBody>
                </Col>
              </Card>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className={Styles.relativeCardWrapper}>
              <Stack direction="horizontal" className="justify-content-between">
                <h4 className="fw-bold">Related Products</h4>
                <div className={Styles.cata__arrow__wrapper}>
                  <CiCircleChevLeft className={Styles.active} />
                  <CiCircleChevRight />
                </div>
              </Stack>

              <Stack
                direction="horizontal"
                className={Styles.relative__wrapper}
              >
                {relativeProducts.map((product, index) => {
                  return (
                    <Link
                      key={product.id}
                      className={Styles.card__link}
                      to={`/product/${product.id}`}
                      replace
                    >
                      <Card className={Styles.relativeProductCard}>
                        <img
                          src={product.images[0]}
                          className={Styles.relativeProduct__img}
                          onError={(e) => {
                            e.target.parentElement.parentElement.classList.add(
                              "d-none"
                            );
                          }}
                        />
                        <CardTitle className={Styles.relativeProduct__title}>
                          {product.title}
                        </CardTitle>
                        <CardBody className="p-2">
                          <Badge className="shadow m-2" pill bg="secondary">
                            {fillterdItem?.category?.name.toUpperCase()}
                          </Badge>
                          <CardText className={Styles.relativeProduct__text}>
                            Price: <FaDollarSign /> <span>{product.price}</span>
                          </CardText>
                        </CardBody>
                      </Card>
                    </Link>
                  );
                })}
              </Stack>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SingleProduct;
