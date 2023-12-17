import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
} from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteFromFire, deleteProduct } from "../../context/cart";
import { deleteCartItems } from "../../utils/fireStore";
function fillterdItem() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productData } = useSelector((store) => store.product);
  const { productsID, firestoreProducts } = useSelector((store) => store.cart);

  let fillterdItem = useMemo(() => {
    return productData.find((item) => {
      return item.id == id;
    });
  }, [id]);

  function handleAddClick() {
    // dispatch({ type: "addToCart", payload: this });
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
  console.log("single product called");
  return (
    <>
      <Container>
        <Row>
          <Col>
            {fillterdItem && (
              <Card>
                <CardImg src={fillterdItem?.images[0]} className="card-img" />
                <CardBody>
                  <CardSubtitle>{fillterdItem.title}</CardSubtitle>
                  <CardText>{fillterdItem.description}</CardText>
                  {/* <CardText className="text-success">
                    {fillterdItem?.rating?.rate}
                    <FaStar />
                    By
                    {fillterdItem?.rating?.count}
                  </CardText> */}
                  <CardText>${fillterdItem?.price}</CardText>
                  <CardText>
                    <Badge className="my-2" pill bg="secondary">
                      {fillterdItem?.category?.name}
                    </Badge>
                  </CardText>
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
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default fillterdItem;
