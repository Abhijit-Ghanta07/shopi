import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Stack,
} from "react-bootstrap";
import { CartEmpty, CartProduct, WishList } from "./cartIndex";

import { useDispatch, useSelector } from "react-redux";
import { ToastOpen } from "../../services/redux/Toast";
import { cartReset } from "../../services/redux/cart";
import { loaderOpen, loaderClose } from "../../services/redux/loader";
import { useNavigate } from "react-router-dom";
import payment from "../../assets/images/payment.jpg";
import { addOrder } from "../../services/firebase/storeOrder";
import { ToastModal, Loader } from "../index.js";
// styles
import Styles from "./cart.module.scss";

const CartWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.auth);
  const { productData } = useSelector((store) => store.product);
  const { productsID } = useSelector((store) => store.cart);
  const wishtList = useSelector((store) => store.wishlist);
  const loading = useSelector((store) => store.loader);

  const initial = { card: null, expiry: null, cvv: null };
  const [cardData, setCardData] = useState(initial);
  const [cardErr, setCardErr] = useState(false);
  const [totalPrice, setTotalPrice] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  // fillter items
  let fillteredItem = useMemo(() => {
    return productData.filter((product) => productsID?.includes(product.id));
  }, [productsID]);

  // totalprice amount
  const Totalamount = useMemo(() => {
    if (totalPrice.length > 0) {
      return totalPrice.reduce((sum, currentItem) => {
        return sum + currentItem;
      }, 0);
    }
  }, [totalPrice]);

  const handleCheckout = (evt) => {
    setModalShow(true);
  };

  const handleBuyClick = async () => {
    try {
      dispatch(loaderOpen());
      const res = await addOrder(
        userId,
        fillteredItem.map((item) => item.id),
        Totalamount
      );
      if (res) {
        dispatch(cartReset(userId));
        dispatch(ToastOpen("Order Sucessfull"));
        navigate("/");
      }
    } catch (err) {
      dispatch(ToastOpen("something went wrong"));
    } finally {
      dispatch(loaderClose());
    }
  };

  function validateData() {
    const card = "4400440044004400";
    const exp = "10/30";
    const cvv = "000";
    if (
      cardData.card == card &&
      cardData.expiry == exp &&
      cardData.cvv == cvv
    ) {
      setCardErr(false);
      handleBuyClick();
    } else {
      setCardErr(true);
    }
  }
  // if product length 0 return empty

  if (!fillteredItem.length) {
    return <CartEmpty />;
  }

  // else loop over the array

  return (
    <>
      <Container fluid="xl" className="mb-4">
        <h3 className="p-2 fw-bold text-center">Shopping Cart</h3>
        <Row className="gap-3">
          <Col md="8" className="order-2 order-md-1">
            <Card className="p-3">
              {/* <Row className="p-3">
                <Col xs="5">Product</Col>
                <Col xs="2">Quantity</Col>
                <Col xs="2" className="text-start">
                  Price
                </Col>
                <Col xs="3"></Col>
              </Row> */}
              <Stack direction="vertical" className="gap-3">
                {fillteredItem.length > 0 &&
                  fillteredItem.map((item) => (
                    <CartProduct
                      key={item?.id}
                      product={item}
                      setTotalPrice={setTotalPrice}
                    />
                  ))}
              </Stack>
            </Card>
            {wishtList.length > 0 ? (
              <Card className="p-3 my-2">
                <CardTitle className="fw-bold fs-4">WishList</CardTitle>
                <WishList />
              </Card>
            ) : (
              <></>
            )}
          </Col>
          <Col md="3" className="order-1 order-md-2">
            <Card className="p-2">
              <CardTitle>Order Now</CardTitle>
              <hr />
              <CardBody>
                <p>Have A Coupon Code:</p>
                <FormControl
                  className="mb-2"
                  placeholder="enter coupon  here"
                />

                <p className="d-flex justify-content-between">
                  <span>Total Price:</span> <span>${Totalamount}</span>
                </p>
                <p className="d-flex justify-content-between">
                  <span>Delivery Charge:</span> <span>Free</span>
                </p>
                <Button
                  variant="info"
                  className="w-100"
                  onClick={handleCheckout}
                >
                  Checkout Now
                </Button>
                <hr />
                <Stack direction="horizontal">
                  <img
                    src={payment}
                    alt="cards"
                    className={Styles.payment__img}
                  />
                </Stack>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Checkout</Modal.Title>
        </Modal.Header>

        <ModalBody>
          <p className="m-0">Card Number:4400440044004400</p>
          <p className="m-0">Expiry:10/30</p>
          <p className="m-0">CVV:000</p>
          <Stack direction="vertical">
            <FormGroup className="mb-3">
              <FormLabel>Card Number:</FormLabel>
              <FormControl
                name="card"
                onChange={(e) => {
                  setCardData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </FormGroup>
            <Row>
              <Col xs="4">
                <FormGroup>
                  <FormLabel>Expiry:</FormLabel>
                  <FormControl
                    name="expiry"
                    onChange={(e) => {
                      setCardData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <FormLabel>CVV:</FormLabel>
                  <FormControl
                    name="cvv"
                    onChange={(e) => {
                      setCardData((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <p className="text-danger">
              {cardErr ? "Please Enter Correct Details" : ""}
            </p>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="danger"
            onClick={() => {
              setModalShow(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={validateData}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
      <ToastModal />
      <Loader loading={loading} />
    </>
  );
};

export default CartWrapper;
