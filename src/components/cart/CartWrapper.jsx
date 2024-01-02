import React, { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  Row,
  Stack,
} from "react-bootstrap";
import { CartEmpty, CartProduct, WishList } from "./cartIndex";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { loadfinish, setloading } from "../../redux/auth";
import { ToastOpen } from "../../redux/Toast";
import { cartReset } from "../../redux/cart";
import { Link, useNavigate } from "react-router-dom";
import payment from "../../assets/images/payment.jpg";
// styles
import Styles from "./cart.module.scss";
import { OrderBatchDelete, addOrder } from "../../utils/orders";

const CartWrapper = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const { productData } = useSelector((store) => store.product);
  const { productsID } = useSelector((store) => store.cart);
  const [totalPrice, setTotalPrice] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  // fillter items
  let fillteredItem = useMemo(() => {
    return productData.filter((product, i) => productsID?.includes(product.id));
  }, [productsID]);

  const handleCheckout = (evt) => {
    setModalShow(true);
  };
  const handleBuyClick = async () => {
    try {
      dispatch(setloading());
      const res = await addOrder(
        userId,
        fillteredItem.map((item) => item.id)
      );
      if (res) {
        dispatch(cartReset(userId));
        dispatch(ToastOpen("Order Sucessfull"));
        navigate("/");
      }
    } catch (err) {
      dispatch(ToastOpen("something went wrong"));
    } finally {
      dispatch(loadfinish());
    }
  };
  // get total amount
  const Totalamount = useMemo(() => {
    if (totalPrice.length > 0) {
      return totalPrice.reduce((sum, currentItem) => {
        return sum + currentItem;
      }, 0);
    }
  }, [totalPrice]);
  // if product length 0 return empty

  if (!fillteredItem.length) {
    return <CartEmpty />;
  }

  // else loop over the array

  return (
    <>
      <Link to={"/"} className={`${Styles.back__btn} btn`}>
        <IoArrowBack />
        Go Back
      </Link>
      <Container fluid="xl" className="mb-4">
        <h3 className="p-2 fw-bold">Shopping Cart</h3>
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
              <WishList />
            </Card>
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
              <FormControl />
            </FormGroup>
            <Row>
              <Col xs="4">
                <FormGroup>
                  <FormLabel>Expiry:</FormLabel>
                  <FormControl />
                </FormGroup>
              </Col>
              <Col xs="4">
                <FormGroup>
                  <FormLabel>CVV:</FormLabel>
                  <FormControl />
                </FormGroup>
              </Col>
            </Row>
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
          <Button variant="primary" onClick={handleBuyClick}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CartWrapper;
