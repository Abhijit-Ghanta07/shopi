import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../../api/api";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  FormCheck,
  FormLabel,
  Row,
} from "react-bootstrap";
import { ProductCard } from "../index.js";
import FormRange from "react-bootstrap/esm/FormRange";
import useFetchData from "../../api/api";

const Category = () => {
  const { id } = useParams();
  const [range, setRange] = useState(20);
  const { data, loading, err } = useFetchData(`categories/${id}/products`);
  // fetch categories
  const products = useMemo(() => {
    return data;
  }, [data]);
  const FILLTERS = [
    "Relavance",
    "Price Low - High",
    "Price High - Low",
    "Popularity",
    "Category",
  ];

  return (
    <Container className="mt-3">
      <Row>
        <Col sm="3">
          <Card>
            <CardBody>
              <CardTitle>Fillters</CardTitle>
              <CardText>Fillter By:</CardText>
              {FILLTERS.map((filter) => (
                <FormCheck
                  type="radio"
                  label={filter}
                  id={filter + "default"}
                  name="formId"
                />
              ))}
              <FormLabel>Price Range:{range}</FormLabel>
              <FormRange
                value={range}
                onChange={(e) => {
                  setRange(e.target.value);
                }}
              />
            </CardBody>
          </Card>
        </Col>
        {/* <p>{products.length} Products Found:</p> */}
        <Col sm="9" className="d-flex flex-wrap">
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
