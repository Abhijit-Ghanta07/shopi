import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ProductList, SlideWrapper } from "../index.js";
import useFetch from "../../hooks/UseFetch";
import { useDispatch, useSelector } from "react-redux";
// scss
import style from "./category.module.scss";
import { ToastOpen } from "../../services/redux/Toast.js";
import Filltercard from "./FillterCard.jsx";

// constant data

const Category = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, err } = useFetch(`categories/${id}/products`);
  // const [filter, setFilter] = useState(true);
  const [products, setProducts] = useState([]);
  // fetch categories
  if (err) {
    dispatch(ToastOpen("We will be back soon!!"));
    return navigate("/", { replace: true });
  }

  return (
    <Container fluid className="m-0 py-3 bg-light">
      <Row className="p-0">
        <Col sm="3">
          <Filltercard data={data} setData={setProducts} />
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

function CategoryBanner() {
  const { categories } = useSelector((store) => store.category);
  const [scrollWid, setScrollWid] = useState(0);
  const slideRef = useRef(null);
  useEffect(() => {
    setScrollWid(slideRef.current?.scrollWidth);
  }, [slideRef]);
  return (
    <Container className=" px-0 my-2 overflow-hidden">
      <Row>
        <div className="div">
          <SlideWrapper
            slideRef={slideRef}
            scrollWid={scrollWid}
            slideBy={100}
          />
        </div>

        <Col>
          <div
            className="d-flex gap-3"
            style={{ transition: ".3s ease" }}
            ref={slideRef}
          >
            {categories?.map((cata, index) => {
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
