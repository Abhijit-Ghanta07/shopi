import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fakeProduct } from "../../constants/constants";

// style
import Styles from "./category.module.scss";
const Category = () => {
  const catagoryList = useSelector((store) => store.category);
  return (
    <>
      <Container fluid className={Styles.con}>
        <Row className="py-3">
          <h2 className="fw-bold px-4 py-2">Shop By Category</h2>
          <Col>
            <div className={Styles.wrapper}>
              {!catagoryList ? (
                <p>Loading....</p>
              ) : (
                <>
                  <Link to={"/"} className={Styles.link}>
                    <img
                      src={fakeProduct[0]}
                      alt="img"
                      className={Styles.cata__img}
                    />
                    <p className={Styles.banner__title}> All</p>
                  </Link>
                  {catagoryList.map((cata) => {
                    return (
                      <Link
                        to={`category/${cata?.id}`}
                        key={cata.id}
                        className={cata.image ? Styles.link : "d-none"}
                      >
                        <img
                          src={cata?.image}
                          alt="catagory img"
                          className={Styles.cata__img}
                          onError={(e) => {
                            e.target.parentElement.classList.add("d-none");
                          }}
                        />
                        <p className={Styles.banner__title}>{cata?.name}</p>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Category;
