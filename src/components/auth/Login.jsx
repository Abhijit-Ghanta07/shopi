import React, { useCallback, useContext, useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
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
import { StoreContext } from "../../context/store";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import Styles from "./auth.module.scss";
import { useForm } from "react-hook-form";
import { getInitialCartItems } from "../../utils/fireStore";

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
  const {
    user: [, dispatch],
    toast: [, toastDispatch],
    cart: [, cartDispatch],
  } = useContext(StoreContext);

  // local states
  const [hide, setHide] = useState(true);
  // handle form submit
  async function formSubmit(data) {
    try {
      dispatch({ type: "setloading" });
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (res.user) {
        // dispatch({ type: "setuser", payload: user?.providerData[0] });
        toastDispatch({ type: "open", payload: "Login Successfull" });
        const result = await getInitialCartItems(res.user.uid);
        mapCartItems(result);
        setUser(res.user);
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "loadfinish" });
    }
  }

  function mapCartItems(products) {
    products.forEach((item) => {
      cartDispatch({ type: "addToCart", payload: item?.productId });
    });
  }

  // update user profile with name image
  function setUser(user) {
    if (user) {
      dispatch({
        type: "setuser",
        payload: user?.providerData[0],
        userId: user?.uid,
      });
      navigate("/");
    }
  }
  // google authentication
  const googleAuth = async () => {
    try {
      dispatch({ type: "setloading" });
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
        toastDispatch({ type: "open", payload: "Login Successfull" });
        dispatch({
          type: "setuser",
          payload: user?.providerData[0],
          userId: user?.uid,
        });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "loadfinish" });
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
                      <CardText className="text-center mt-1">
                        <hr className="mb-2" />
                      </CardText>
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
