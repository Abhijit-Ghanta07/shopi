import React from "react";
import {
  Button,
  Col,
  Container,
  FormControl,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// styles
import style from "./footer.module.scss";

const Footer = () => {
  return (
    <>
      <Container fluid className={style.footer__container}>
        <Row className="py-4">
          <Col className="text-center">
            <p className="display-6 fw-bold m-0">Shopi</p>
            <p className="small">All Your Needs Are Here.</p>
          </Col>
          <Col>
            <p className="fw-bold fs-5">Quick Links</p>
            <Stack direction="vertical" gap={2}>
              <Link className={style.links}>Products</Link>
              <Link className={style.links}>Cloths</Link>
              <Link className={style.links}>Electronics</Link>
              <Link className={style.links}>Shoes</Link>
            </Stack>
          </Col>
          <Col className="p-md-4">
            <p className=" fs-5 fw-bold">Subscribe To NewsLetter</p>
            <Stack gap={3}>
              <FormControl className="" placeholder="Enter you email" />
              <Button
                variant="primary"
                style={{ width: "fit-content", marginInline: "auto" }}
              >
                Subscribe
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
