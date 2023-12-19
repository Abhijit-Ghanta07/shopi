import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// css
import Styles from "./banner.module.scss";
import { Link } from "react-router-dom";
import fetchData from "../../../api/api";
import { fakeProduct } from "../../../constants/constants";
const Banner = () => {
  const [loading, setLoading] = useState(false);
  const [catagories, setCatagories] = useState([]);
  // get allcatagories
  useEffect(() => {
    const abortController = new AbortController();
    async function getCatagories() {
      setLoading(true);
      const catagory = await fetchData("categories", abortController.signal);
      if (catagory) {
        setCatagories(catagory);
        setLoading(false);
      }
    }
    getCatagories();
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <>
      <Container fluid="xl" className="card mt-3">
        <Row className="py-3">
          <Col>
            <div className="d-flex justify-content-around flex-wrap">
              {loading ? (
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
                  {catagories &&
                    catagories.map((cata) => {
                      return (
                        <Link
                          to={`category/${cata?.id}`}
                          key={cata.id}
                          className={cata.image ? Styles.link : "d-none"}
                        >
                          <img
                            src={cata?.image}
                            alt="catagory img"
                            className={cata.image ? Styles.cata__img : "d-none"}
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
