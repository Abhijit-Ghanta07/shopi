import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fakeProduct } from "../../constants/constants";
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
// style
import Styles from "./category.module.scss";
const Category = () => {
  const catagoryList = useSelector((store) => store.category);
  const slideRef = useRef(null);
  const btnRef = useRef(null);
  const [index, setIndex] = useState(0);
  const screeen = window.innerWidth;
  const scrollEle = slideRef.current?.scrollWidth;
  // const handleSlideClick = () => {
  //   setIndex(index + 1);
  //   if (screeen < scrollEle && index < 5) {
  //     slideRef.current.style.transform = `translateX(-${index * 80}px)`;
  //   }
  // };

  // useEffect(() => {
  //   if (screeen < 450) {
  //     btnRef.current.style.display = "block";
  //   }
  // }, []);
  return (
    <>
      <Container fluid className={Styles.con}>
        <Row className="py-3 ">
          <Col xs={8}>
            <h4 className="fw-bold">Shop By Category</h4>
          </Col>
          <Col xs={4}>
            <div className={Styles.cata__arrow__wrapper}>
              <CiCircleChevLeft className={Styles.active} />
              <CiCircleChevRight />
            </div>
          </Col>
        </Row>
        <Row className="p-0">
          <Col>
            <div className={Styles.wrapper} ref={slideRef}>
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
            {/* <button
              className={Styles.next__btn}
              ref={btnRef}
              onClick={handleSlideClick}
            >
              Next
            </button> */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Category;
