import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../api/api";
import { Card, Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../index.js";

const Category = () => {
  const { id } = useParams();
  const [products, setProduct] = useState([]);
  // fetch categories
  useEffect(() => {
    let abortController = new AbortController();
    async function fetchProduct() {
      let data = await fetchData(
        `categories/${id}/products`,
        abortController.signal
      );
      console.log(data);
      setProduct(data);
    }
    fetchProduct();
    return () => {
      abortController.abort();
    };
  }, [id]);

  return (
    <Container className="mt-3">
      <Row>
        <p>{products.length} Products Found:</p>
        <Col className="d-flex flex-wrap gap-3 justify-content-center">
          {products &&
            products.map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
