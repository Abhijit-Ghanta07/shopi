import React, { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
import { Loader } from "../index.js";
import FormRange from "react-bootstrap/esm/FormRange";
import { fetchData } from "../../api/Api";
const ProductCard = lazy(() => import("../ProductCard/ProductCard"));
const Category = () => {
  const { id } = useParams();
  const [range, setRange] = useState(20);
  const [products, setProducts] = useState(null);
  // const [filter, setFilter] = useState(true);
  // fetch categories

  const FILLTERS = [
    "Relavance",
    "Price Low - High",
    "Price High - Low",
    "Popularity",
    "Category",
  ];
  function handleChange(e) {
    let value = e.target.value;
    let filt = FILLTERS.findIndex((item) => item == value);
    if (filt == 2) {
      return setProducts(products.sort((a, b) => a.price < b.price));
    }
  }
  console.log(products);
  useEffect(() => {
    const Controller = new AbortController();
    async function GetCatagoryProduct(params) {
      const Product = await fetchData(
        `categories/${id}/products`,
        Controller.signal
      );
      setProducts(Product);
    }
    GetCatagoryProduct();
    return () => {
      Controller.abort();
      console.log("aborted");
    };
  }, [id]);

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
                  value={filter}
                  onChange={handleChange}
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
              <Suspense fallback={<Loader loading={true} />}>
                <ProductCard product={item} key={item.id} />
              </Suspense>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
