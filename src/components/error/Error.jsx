import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Styles from "./error.module.scss";
function Error() {
  return (
    <>
      <section className={Styles.page__404}>
        <Container>
          <Row>
            <Col sm="12">
              <Col sm="12" className="col-sm-offset-1  text-center">
                <div className={Styles.four__zero_four_bg}>
                  <h1 className="text-center ">404</h1>
                </div>

                <div className={Styles.contant__box_404}>
                  <h3 className="h2">Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <Link to={"/"} replace className={Styles.link__404}>
                    Go to Home
                  </Link>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Error;
