import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
import { ProductList } from "../index.js";
import FormRange from "react-bootstrap/esm/FormRange";
import useFetch from "../../hooks/UseFetch";
import useMaxPrice from "../../hooks/UseMaxPrice.jsx";
// scss
import style from "./category.module.scss";

// constant data

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [filter, setFilter] = useState(true);
  const [products, setProducts] = useState([]);
  // fetch categories
  const { data, loading, err } = useFetch(`categories/${id}/products`);
  if (err) {
    return navigate("/", { replace: true });
  }

  return (
    <Container fluid className="m-0 py-4 bg-light">
      <Row>
        <Col sm="3">
          <Fillterscard data={data} setData={setProducts} />
        </Col>
        {/* <p>{products.length} Products Found:</p> */}
        <Col sm="9">
          {/* {products &&
            products?.map((item, index) => (
              <ProductCard product={item} key={index} />
            ))} */}
          <ProductList
            data={products}
            loading={loading}
            title="Filltered Products"
          />
        </Col>
      </Row>
    </Container>
  );
};

function Fillterscard({ data, setData }) {
  const { maxprice } = useMaxPrice(data);
  const [searchParam, setSearchParam] = useSearchParams();
  const [range, setRange] = useState(0);
  const FILLTERS = ["Relavance", "Price Low - High", "Price High - Low"];
  function handleChange(e) {
    let value = e.target.value;
    if (!data) {
      return;
    }
    let filt = FILLTERS.findIndex((item) => item == value);
    sortProduct(filt);
  }
  function sortProduct(q) {
    switch (q) {
      case 0:
        setData(data);
        setSearchParam({ sort: "relevance" });
        break;
      case 1:
        setData([...data].sort((a, b) => a.price - b.price));
        setSearchParam({ sort: "low-high" });
        break;
      case 2:
        setData([...data].sort((a, b) => b.price - a.price));
        setSearchParam({ sort: "high-low" });
        break;
      default:
        setData(data);
    }
  }
  useEffect(() => {
    setData(data);
  }, [data]);
  useEffect(() => {
    if (data) {
      let sortedData = data?.filter((item) => item.price > range);
      setData(sortedData);
    }
    setSearchParam({ sort: `price>${range}` });
  }, [range]);
  return (
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
            max={maxprice}
            onChange={(e) => {
              setRange(e.target.value);
            }}
          />
        </div>
        <div className={style.hide__lg}>
          <FormSelect onChange={handleChange}>
            {FILLTERS?.map((fillter, index) => {
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
  );
}

export default Category;
