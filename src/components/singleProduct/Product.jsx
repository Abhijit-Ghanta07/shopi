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
function fillterdItem() {
  const { id } = useParams();

  // let fillterdItem = useMemo(() => {
  //   return productState.find((item) => {
  //     return item.id == id;
  //   });
  // }, [id]);

  // function handleAddClick() {
  //   dispatch({ type: "addToCart", payload: this });
  // }
  // function handleRemoveClick() {
  //   dispatch({ type: "deleteFromCart", payload: this });
  // }
  console.log("single product called");
  return (
    <>
      <Container>
        <Row>
          <Col>
            {fillterdItem && (
              <Card>
                <CardImg src={fillterdItem.image} className="card-img" />
                <CardBody>
                  <CardSubtitle>{fillterdItem.title}</CardSubtitle>
                  <CardText>{fillterdItem.description}</CardText>
                  <CardText className="text-success">
                    {fillterdItem?.rating?.rate}
                    <FaStar />
                    By
                    {fillterdItem?.rating?.count}
                  </CardText>
                  <CardText>${fillterdItem?.price}</CardText>
                  <div className="d-flex gap-3">
                    {cart.includes(fillterdItem.id) ? (
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
