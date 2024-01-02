import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";

import Styles from "./order.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { getOrders } from "../../utils/orders";
import { useSelector } from "react-redux";

const Order = () => {
  const { userId } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function allOrders() {
      const orders = await getOrders(userId);
      setOrders(orders);
    }
    allOrders();
  }, []);
  console.log(orders);
  function convertTime(seconds) {
    const date = new Date(0); // The 0 is the epoch (January 1, 1970)
    date.setUTCSeconds(seconds);
    return date.toLocaleDateString();
  }
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <Card className="p-3">
              <CardTitle className="text-center fw-bold fs-4">
                My Orders
              </CardTitle>
              <CardBody>
                <Stack
                  direction="vertical"
                  gap={2}
                  className="align-items-center"
                >
                  {orders &&
                    orders.map((item) => {
                      return (
                        <Card className={Styles.order__card}>
                          <p>
                            Order Date:{convertTime(item.timestamp?.seconds)}
                          </p>
                          <p>Price:{item?.price}</p>
                          <Button variant="primary">See Products</Button>
                        </Card>
                      );
                    })}
                </Stack>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Order;
