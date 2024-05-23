import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { BsCurrencyDollar } from "react-icons/bs";
import { ProductCard, SlideWrapper } from "../index";
// scss
import Styles from "./product.module.scss";

function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fireId, findId] = useFindProduct();
  const { productData } = useSelector((store) => store.product);
  const { productsID } = useSelector((store) => store.cart);
  const { userId } = useSelector((store) => store.auth);
  // local States
  const [imgState, setImgState] = useState(0);
  // filltered items
  const fillterdItem = useMemo(() => {
    return productData?.find((item) => {
      return item.id == id;
    });
  }, [id]);
  const relativeProducts = useMemo(() => {
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
  function handleBuyClick() {
    if (!userId) {
      return navigate("/auth");
    }
    if (productsID.includes(this)) {
      return navigate("/cart", { state: true });
    }
    dispatch(addItem({ productId: this, userId: userId }));
    return navigate("/cart", { state: true });
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
                      className="my-2"
                      pill
                      bg="secondary"
                      style={{ fontFamily: "tabara" }}
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
                      <Button
                        variant="warning"
                        onClick={handleBuyClick.bind(fillterdItem?.id)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </CardBody>
                </Col>
              </Card>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <RelativeProduct relativeProducts={relativeProducts} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

function RelativeProduct({ relativeProducts }) {
  const [scrollWid, setScrollWid] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    setScrollWid(slideRef.current.scrollWidth);
  }, [slideRef]);

  return (
    <>
      <Card className={Styles.relativeCardWrapper}>
        <Stack direction="horizontal" className="justify-content-between">
          <h4 className="fw-bold">Related Products</h4>
        </Stack>

        <SlideWrapper
          slideRef={slideRef}
          scrollWid={scrollWid}
          slideBy={130}
          deley={3000}
        />
        <Stack
          direction="horizontal"
          className={Styles.relative__wrapper}
          ref={slideRef}
        >
          {relativeProducts?.map((product, index) => {
            return (
              <ProductCard
                product={product}
                width={"12rem"}
                key={product?.id}
              />
            );
          })}
        </Stack>
      </Card>
    </>
  );
}

export default SingleProduct;
