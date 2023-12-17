import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Container className="bg-dark" fluid>
        <Row className="py=4">
          <Col>Brand Logo</Col>
          <Col>Quick Links</Col>
          <Col>NewsLetter</Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
