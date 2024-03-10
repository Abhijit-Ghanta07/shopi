import React, { useEffect, useMemo, useState } from "react";
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
  FormSelect,
  Row,
} from "react-bootstrap";
import { Loader } from "../index.js";
import FormRange from "react-bootstrap/esm/FormRange";
import useFetchData from "../../api/Api";
import { useDispatch } from "react-redux";
import { loaderOpen, loaderClose } from "../../redux/loader.js";
import ProductCard from "../ProductCard/ProductCard";

// scss
import style from "./category.module.scss";
// constant data
const FILLTERS = [
  "Relavance",
  "Price Low - High",
  "Price High - Low",
  "Popularity",
  "Category",
];
const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [range, setRange] = useState(100);
  const [products, setProducts] = useState([]);
  // const [filter, setFilter] = useState(true);
  // fetch categories
  const { data, loading, err } = useFetchData(`categories/${id}/products`);

  function handleChange(e) {
    let value = e.target.value;
    let filt = FILLTERS.findIndex((item) => item == value);
    sortProduct(filt);
  }
  function sortProduct(q) {
    switch (q) {
      case 0:
        setProducts(data);
        break;
      case 1:
        setProducts([...data].sort((a, b) => a.price - b.price));
        break;
      case 2:
        setProducts([...data].sort((a, b) => b.price - a.price));
        break;
      default:
        setProducts(data);
        break;
    }
  }
  useEffect(() => {
    setProducts(data);
  }, [data]);

  useEffect(() => {
    if (products) {
      const sortedData = data?.filter((item) => item.price > range);
      setProducts(sortedData);
    }
  }, [range]);

  useEffect(() => {
    if (loading) {
      dispatch(loaderOpen());
    } else {
      dispatch(loaderClose());
    }
  }, [loading]);
  return (
    <Container className="mt-3 py-4">
      <Row>
        <Col sm="3">
          <Card className="my-3">
            <CardBody className={style.card__wrapper}>
              <CardTitle className={style.hide__sm}>Fillters</CardTitle>
              <CardText className={style.filter__title}>Sort By:</CardText>
              <div className={style.hide__sm}>
                {FILLTERS.map((filter, index) => (
                  <FormCheck
                    key={index}
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
                  max={1000}
                  onChange={(e) => {
                    setRange(e.target.value);
                  }}
                />
              </div>
              <div className={style.hide__lg}>
                <FormSelect>
                  {FILLTERS.map((fillter, index) => {
                    return (
                      <option key={index} value={fillter}>
                        {fillter}
                      </option>
                    );
                  })}
                </FormSelect>
              </div>
            </CardBody>
          </Card>
        </Col>
        {/* <p>{products.length} Products Found:</p> */}
        <Col sm="9" className="d-flex flex-wrap">
          {products &&
            products.map((item, index) => (
              <ProductCard product={item} key={index} />
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Category;
