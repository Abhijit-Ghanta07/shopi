import React from "react";
import { Col, Container, Row } from "react-bootstrap";

// css
import Styles from "./banner.module.scss";
import { Link } from "react-router-dom";
import useFetchData from "../../api/Api";
import { fakeProduct } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { ToastOpen } from "../../redux/Toast";
const Banner = () => {
  const data = useSelector((store) => store.category);

  return (
    <>
      <Container fluid="xl" className="card mt-3">
        <Row className="py-3">
          <Col>
            <div className="d-flex justify-content-around flex-wrap">
              {!data ? (
                <p>Loading....</p>
              ) : (
                <>
                  <Link to={"/"} className={Styles.link}>
                    <img
                      src={fakeProduct[0]}
                      alt="img"
                      className={Styles.cata__img}
                    />
                    <p> All</p>
                  </Link>
                  {data &&
                    data.map((cata) => {
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
                          <p> {cata?.name}</p>
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

export default Banner;
