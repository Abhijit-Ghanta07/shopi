import React, { useCallback, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { loaderOpen, loaderClose } from "../../redux/loader";
import { Loader, ToastModal } from "../loader/Loader";

const Order = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loader);
  const { userId } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  async function allOrders() {
    try {
      dispatch(loaderOpen());
      const orders = await getOrders(userId);
      setOrders(orders);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loaderClose());
    }
  }

  function convertTime(seconds) {
    const date = new Date(0); // The 0 is the epoch (January 1, 1970)
    date.setUTCSeconds(seconds);
    return date.toLocaleDateString();
  }
  useEffect(() => {
    allOrders();
  }, [userId]);
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
                    orders.map((item, index) => {
                      return (
                        <Card key={index} className={Styles.order__card}>
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
      <Loader loading={loading} />
    </>
  );
};

export default Order;
