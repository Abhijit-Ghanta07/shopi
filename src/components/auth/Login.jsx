import React, { useCallback, useContext, useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  DropdownDivider,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from "react-bootstrap";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Styles from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { getCartItems } from "../../utils/fireStore";
import { useDispatch, useSelector } from "react-redux";
import { addUser, loadfinish, setloading } from "../../context/auth";
import { mapCart } from "../../context/cart";
import { open } from "../../context/Toast";

const Login = () => {
  // navigate func
  const navigate = useNavigate();
  // useform func
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // global states or context
  const dispatch = useDispatch();
  // local states
  const [hide, setHide] = useState(true);
  // handle form submit
  async function formSubmit(data) {
    try {
      dispatch(setloading());
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (res.user) {
        const userCart = await getCartItems(res.user.uid);
        mapCartItems(userCart);
        setUser(res.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loadfinish());
    }
  }

  function mapCartItems(products) {
    products.forEach((item) => {
      dispatch(
        mapCart({
          productId: item.productId,
          quantity: item.quantity,
          fireId: item.fireId,
        })
      );
    });
  }

  // update user profile with name image
  function setUser(logUser) {
    if (logUser) {
      dispatch(
        addUser({ user: logUser?.providerData[0], userId: logUser.uid })
      );
      dispatch(open("Login Successfull"));
      navigate("/");
    }
  }
  // google authentication
  const googleAuth = async () => {
    try {
      dispatch(setloading());
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
        const userCart = await getCartItems(user.uid);
        mapCartItems(userCart);
        setUser(user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(loadfinish());
    }
  };
  return (
    <>
      <Container fluid className={Styles.bg__gradient}>
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col className="p-0">
              <Card className={Styles.auth__card}>
                <Row>
                  <Col className="p-4">
                    <Card className="p-3 border-0 shadow">
                      <CardTitle>Login</CardTitle>
                      <CardText>
                        Don't have an account Yet?{" "}
                        <Link to={"register"} className=" py-3">
                          Sign Up
                        </Link>
                      </CardText>
                      <Form onSubmit={handleSubmit(formSubmit)} className="">
                        <FormGroup>
                          <FormLabel>Enter Email:</FormLabel>
                          <FormControl
                            placeholder="Example@email.com"
                            type="email"
                            {...register("email", { required: true })}
                            aria-invalid={errors.email ? "true" : "false"}
                            autoComplete=""
                          />
                          <p
                            className={
                              errors.email
                                ? "text-danger visible m-0"
                                : "invisible m-0"
                            }
                          >
                            {errors.email?.type === "required" ? (
                              <span>Email is Required</span>
                            ) : (
                              <span>Enter a Valid Email</span>
                            )}
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel
                            className="d-flex justify-content-between"
                            role="button"
                          >
                            Password:
                            <FaRegEyeSlash
                              onClick={() => {
                                setHide(!hide);
                              }}
                            />
                          </FormLabel>
                          <FormControl
                            placeholder="Password"
                            type={hide ? "password" : "text"}
                            {...register("password", { required: true })}
                            autoComplete=""
                          />
                          <p
                            className={
                              errors.password
                                ? "text-danger visible m-0"
                                : "invisible m-0"
                            }
                          >
                            {errors.password?.type === "required" ? (
                              <span>Password is Required</span>
                            ) : (
                              <span>Enter a Valid Password</span>
                            )}
                          </p>
                        </FormGroup>
                        <FormGroup className="d-flex gap-2">
                          <FormCheck />
                          <FormLabel>Remember Me</FormLabel>
                        </FormGroup>

                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 fs-5 "
                        >
                          Login
                        </Button>
                      </Form>

                      <DropdownDivider />

                      <div className="d-flex justify-content-center gap-3">
                        <Link className="icon-link btn btn-outline-primary">
                          <FaFacebookF />
                          FaceBook
                        </Link>
                        <Link
                          className="icon-link btn btn-outline-danger"
                          onClick={googleAuth}
                        >
                          <FaGoogle />
                          Google
                        </Link>
                      </div>
                    </Card>
                  </Col>
                  <Col md className="py-4">
                    <div className={Styles.card__img}></div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Login;
