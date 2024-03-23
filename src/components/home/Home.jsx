import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ProductList } from "../index.js";

const Home = () => {
  const { productData, loading } = useSelector((store) => store.product);
  return (
    <Container fluid className="p-0 m-0">
      <ProductList
        data={productData}
        loading={loading}
        title={"Trending Products"}
      />
    </Container>
  );
};

export default Home;
