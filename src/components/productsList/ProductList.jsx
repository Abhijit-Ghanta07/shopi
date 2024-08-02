import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../index.js";
import { useDispatch } from "react-redux";
// scss
import Styles from "./productlist.module.scss";
import { loaderClose, loaderOpen } from "../../services/redux/loader.js";
function ProductList({ data, loading, title }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading) {
      dispatch(loaderOpen());
    } else {
      dispatch(loaderClose());
    }
  }, [loading]);

  return (
    <>
      <Container fluid className={Styles.list__con}>
        <Row>
          <h4 className="fw-bold p-3">{title ? title : "Trending Products"}</h4>
          <Col className="d-flex flex-wrap gap-1 row-gap-3">
            {data?.length > 0 &&
              data?.map((item, index) => (
                <ProductCard product={item} key={index} />
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductList;
