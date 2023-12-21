import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../index.js";
import { RxMagnifyingGlass } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Banner } from "../../includes/includes.js";
// scss
import Styles from "./productlist.module.scss";
function ProductList() {
  const { productData } = useSelector((store) => store.product);

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
