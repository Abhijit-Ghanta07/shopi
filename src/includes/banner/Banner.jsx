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
  const catagoryList = useSelector((store) => store.category);

  return (
    <>
      <Container fluid="xl" className="card mt-3">
        <Row className="py-3">
          <Col>
            <div className="d-flex justify-content-around flex-wrap">
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
                    <p> All</p>
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
                            console.dir(e.target.parentElement);
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
      <Container fluid className="mt-2 p-0">
        <Row className="overflow-hidden mx-3">
          <Col className={Styles.slider__wrapper}>
            {catagoryList.map((slide, index) => {
              return (
                <div className={Styles.slider} key={slide.id}>
                  <img
                    src={slide.image}
                    alt="slides"
                    className={Styles.slider__img}
                  />
                  <p className="fw-bold display-6 py-4 px-3 text-light position-absolute top-0 ">
                    Shoes as your Needs
                  </p>
                </div>
              );
            })}

            {/* <div className={Styles.slider}>
              <img
                src="https://images.pexels.com/photos/17685567/pexels-photo-17685567/free-photo-of-a-group-of-people-riding-surfboards-in-the-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className={Styles.slider__img}
              />
              <p className="fw-bold display-6 py-4 text-dark position-absolute top-0 ">
                Shoes as your Needs
              </p>
            </div> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;
