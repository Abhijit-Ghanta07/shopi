import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  Col,
  Container,
  Row,
  Badge,
  Stack,
  CardTitle,
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteFromFire, deleteProduct } from "../../context/cart";
import { deleteCartItems } from "../../utils/fireStore";
import Styles from "./product.module.scss";
function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productData } = useSelector((store) => store.product);
  const { productsID, firestoreProducts } = useSelector((store) => store.cart);
  const { userId } = useSelector((store) => store.auth);

  let fillterdItem = useMemo(() => {
    return productData.find((item) => {
      return item.id == id;
    });
  }, [id]);

  function handleAddClick() {
    // dispatch({ type: "addToCart", payload: this });
    if (!userId) {
      return navigate("/auth");
    }
    dispatch(addProduct(this));
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
  const sizeArr = ["M", "L", "XL", "XXL"];
  console.log("single product called");
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col>
            {fillterdItem && (
              <Card className="py-4 px-3 gap-4 flex-sm-row">
                <Col xs="12" sm="4">
                  <Stack direction="vertical" gap={2}>
                    <img
                      src={fillterdItem?.images[0]}
                      className={Styles.card__img}
                    />
                    <Stack direction="horizontal" gap={1}>
                      {fillterdItem?.images.map((img) => (
                        <img src={img} className={Styles.slide__img} />
                      ))}
                    </Stack>
                  </Stack>
                </Col>
                <Col xs="12" sm="8">
                  <CardBody>
                    <CardTitle>{fillterdItem.title}</CardTitle>
                    {/* <CardText>{fillterdItem.description}</CardText> */}
                    <CardText className="fw-medium fs-5">
                      Price: ${fillterdItem?.price}
                    </CardText>
                    <CardText>
                      <Badge className="my-2" pill bg="secondary">
                        {fillterdItem?.category?.name}
                      </Badge>
                    </CardText>
                    <CardText>SIZE:</CardText>
                    <Stack direction="horizontal" gap={2} className="pb-3">
                      {sizeArr.map((size) => (
                        <Button size="sm">{size}</Button>
                      ))}
                    </Stack>
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
                        Buy Now
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
