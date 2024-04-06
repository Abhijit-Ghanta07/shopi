import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
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
import { ProductList, SlideWrapper } from "../index.js";
import FormRange from "react-bootstrap/esm/FormRange";
import useFetch from "../../hooks/UseFetch";
import useMaxPrice from "../../hooks/UseMaxPrice.jsx";
// scss
import style from "./category.module.scss";
import { useSelector } from "react-redux";

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
    <Container fluid className="m-0 py-3 bg-light">
      <Row className="p-0">
        <Col sm="3">
          <Fillterscard data={data} setData={setProducts} />
        </Col>
        {/* <p>{products.length} Products Found:</p> */}
        <Col sm="9" className="p-0">
          {/* {products &&
            products?.map((item, index) => (
              <ProductCard product={item} key={index} />
            ))} */}
          <CategoryBanner />
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
    <Card className="my-3 py-3">
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

function CategoryBanner() {
  const catagoryList = useSelector((store) => store.category);
  const [scrollWid, setScrollWid] = useState(0);
  const slideRef = useRef(null);

  useEffect(() => {
    setScrollWid(slideRef.current?.scrollWidth);
  }, [slideRef]);
  return (
    <Container className=" px-0 my-3 overflow-hidden">
      <Row>
        <h2>
          {" "}
          <SlideWrapper
            slideRef={slideRef}
            scrollWid={scrollWid}
            slideBy={100}
          />
        </h2>
        <Col>
          <div
            className="d-flex gap-3"
            style={{ transition: ".3s ease" }}
            ref={slideRef}
          >
            {catagoryList &&
              catagoryList.map((cata, index) => {
                return (
                  <Link
                    key={cata?.id}
                    className={style.cata__link}
                    to={`/category/${cata?.id}`}
                  >
                    <img
                      src={cata?.image}
                      alt="catagory img"
                      className={style.cata__img}
                      onError={(e) => {
                        e.target.parentElement.classList.add("d-none");
                      }}
                    />
                    <p className={style.cata__text}>{cata?.name}</p>
                  </Link>
                );
              })}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Category;
