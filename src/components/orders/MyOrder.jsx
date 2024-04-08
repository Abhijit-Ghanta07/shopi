import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Stack,
} from "react-bootstrap";

import Styles from "./order.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { getOrders } from "../../services/firebase/storeOrder";
import { useDispatch, useSelector } from "react-redux";
import { loaderOpen, loaderClose } from "../../services/redux/loader";
import { Loader, ToastModal } from "../loader/Loader";
import { ProductList } from "../index";
import { ToastOpen } from "../../services/redux/Toast";

const Order = () => {
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.loader);
  const { userId } = useSelector((store) => store.auth);
  const { productData } = useSelector((store) => store.product);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [orders, setOrders] = useState([]);
  const [productsDetails, setProductDetails] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
  const handleClick = useMemo(() => {
    selectedOrder?.products?.forEach((item) => {
      try {
        let findedProducts = productData.find((product) => {
          if (product) {
            return product?.id == item;
          } else {
            return null;
          }
        });
        setProductDetails((prev) => [...prev, findedProducts]);
        setShow(true);
      } catch (err) {
        dispatch(ToastOpen("Sorry For the in convinient"));
      }
    });
  }, [selectedOrder]);
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
                          <Button
                            variant="primary"
                            onClick={() => {
                              setSelectedOrder(item);
                            }}
                          >
                            See Products
                          </Button>
                        </Card>
                      );
                    })}
                </Stack>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
      >
        <ModalHeader closeButton>
          <p>Order Products Details</p>
        </ModalHeader>
        <ModalBody className="overflow-auto" style={{ height: "20rem" }}>
          {productsDetails.length > 1 ? (
            <ProductList
              data={productsDetails}
              loading={false}
              title={"Order Products"}
            />
          ) : (
            ""
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="danger"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Loader loading={loading} />
    </>
  );
};

export default Order;
