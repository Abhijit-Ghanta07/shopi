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
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../../redux/cart";
import { IoArrowBack } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import useFindProduct from "../../hooks/FindProduct";

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
  let fillterdItem = useMemo(() => {
    return productData.find((item) => {
      return item.id == id;
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
      <Link to={"/"} className={`${Styles.back__btn} btn`}>
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
                    <CardTitle>{fillterdItem.title}</CardTitle>
                    <Badge className="my-2" pill bg="secondary">
                      {fillterdItem?.category?.name}
                    </Badge>
                    {/* <CardText>{fillterdItem.description}</CardText> */}
                    <CardText className="fw-bold fs-5 m-0">
                      Price: <BsCurrencyDollar />
                      {fillterdItem?.price}
                    </CardText>
                    <CardText className="m-0 fw-medium">IMAGES:</CardText>
                    <Stack direction="horizontal" gap={1} className="mb-2">
                      {fillterdItem?.images.map((img, i) => (
                        <img
                          src={img}
                          className={Styles.slide__img}
                          onClick={() => {
                            setImgState(i);
                          }}
                        />
                      ))}
                    </Stack>
                    <CardText className="m-0">SIZE:</CardText>

                    <ButtonGroup className="mb-3">
                      {sizeArr.map((size) => (
                        <Button size="" variant="secondary">
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
                          variant="warning"
                          onClick={handleAddClick.bind(fillterdItem.id)}
                        >
                          Add To Cart
                        </Button>
                      )}

                      <Button
                        variant="success"
                        onClick={() => {
                          console.log("buy click", fillterdItem.id);
                        }}
                      >
                        Add to WishList
                      </Button>
                    </div>
                  </CardBody>
                </Col>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SingleProduct;
