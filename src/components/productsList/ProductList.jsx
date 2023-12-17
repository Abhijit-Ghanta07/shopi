import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Col, Container, FormControl, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { RxMagnifyingGlass } from "react-icons/rx";
import Styles from "./productlist.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductData } from "../../context/Product";
function ProductList() {
  const dispatch = useDispatch();
  const { productData } = useSelector((store) => store.product);

  // const allProducts = useMemo(() => {
  //   return ProductState;
  // }, [ProductState]);

  useEffect(() => {
    dispatch(fetchProductData());
  }, []);
  return (
    <>
      <Container fluid="xl" className="mt-5">
        {/* <Row className="py-3">
          <Col className="d-flex justify-content-between">
            <div className="d-flex">
              <label htmlFor="" className="d-flex gap-1 align-items-center">
                <span className="w-100 text-center fs-5 fw-medium">
                  Search For Product:
                </span>
                <FormControl />
               <span>
                  <RxMagnifyingGlass className={Styles.icon} />
                </span> 
              </label>
            </div>
            <select
              name=""
              id=""
              className="form-select ms-auto"
              style={{ width: "fit-content" }}
            >
              <option value="">Sort By</option>
              <option value="">Relevance</option>
              <option value="">Popularity</option>
              <option value="">Price</option>
            </select>
          </Col>
        </Row> */}
        <Row>
          <Col className="d-flex flex-wrap gap-3 justify-content-around">
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
