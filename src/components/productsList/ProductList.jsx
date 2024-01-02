import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../index.js";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../../includes/includes.js";
// scss
import Styles from "./productlist.module.scss";
import { loaderClose, loaderOpen } from "../../redux/loader.js";
function ProductList() {
  const dispatch = useDispatch();
  const { productData, loading } = useSelector((store) => store.product);
  if (loading) {
    dispatch(loaderOpen());
  } else {
    dispatch(loaderClose());
  }

  return (
    <>
      <Container fluid="xl" className="mt-5">
        <Row>
          <Col className="d-flex flex-wrap gap-2 justify-content-center">
            {productData &&
              productData.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
