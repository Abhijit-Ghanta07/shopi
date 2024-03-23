import React from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";

// css
import Styles from "./banner.module.scss";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
const Banner = () => {
  const catagoryList = useSelector((store) => store.category);

  return (
    <>
      <Container fluid className={Styles.slider__con}>
        <Row>
          <Col className={Styles.slider__wrapper}>
            {catagoryList?.map((slide, index) => {
              return (
                <Container className={Styles.slider} key={slide?.id}>
                  <Row key={slide.id}>
                    <Col className="p-4" xs>
                      <h3 className={Styles.slider__title}>
                        buy the best products that suit you from around the
                        world
                      </h3>
                      <p className={Styles.slider__subtitle}>
                        Start your shopping right now. <br /> and add your item
                        to the cart
                      </p>
                      <p></p>
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="py-3 px-2 z-3 position-relative"
                      >
                        <Button variant="secondary">Buy Now </Button>
                        <Button variant="warning">View More</Button>
                      </Stack>
                    </Col>

                    <Col xs>
                      <img
                        src={slide?.image}
                        alt="slider image"
                        className={Styles.slider__img}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </Col>
                  </Row>
                </Container>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;
