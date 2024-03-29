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
          <Col sm className="text-center">
            <p className="display-6 fw-bold m-0">Shopi</p>
            <p className="small">All Your Needs Are Here.</p>
          </Col>
          <Col sm className="text-center">
            <p className={style.link__group__title}>Quick Links</p>
            <Stack direction="vertical" gap={2} className="align-items-center">
              <Link className={style.links}>Products</Link>
              <Link className={style.links}>Cloths</Link>
              <Link className={style.links}>Electronics</Link>
              <Link className={style.links}>Shoes</Link>
            </Stack>
          </Col>
          <Col sm className="p-md-4 text-center">
            <p className={style.link__group__title}>Subscribe To NewsLetter</p>
            <Stack gap={3}>
              <FormControl className="" placeholder="Email" />
              <Button
                variant="primary"
                style={{ width: "fit-content", marginInline: "auto" }}
              >
                <span className="text-dark fw-bold">Subscribe</span>
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
