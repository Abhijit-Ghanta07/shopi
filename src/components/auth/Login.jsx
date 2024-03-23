import React, { useState } from "react";
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
  Row,
} from "react-bootstrap";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { mapItem } from "../../services/redux/cart";
import { ToastOpen } from "../../services/redux/Toast";
import { loaderClose, loaderOpen } from "../../services/redux/loader";
import useSetUser from "../../hooks/UseSetUser";
// scss
import Styles from "./auth.module.scss";

const Login = () => {
  // navigate func
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setUserState] = useSetUser();
  // useform func
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // global states or context

  // local states
  const [hide, setHide] = useState(true);
  const [checked, setcheck] = useState(true);
  // handle form submit
  async function formSubmit(data) {
    try {
      dispatch(loaderOpen());
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (res.user) {
        dispatch(mapItem(res.user?.uid));
        setUserState(res.user, "Login successfull");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      dispatch(ToastOpen("Failed To Login"));
    } finally {
      dispatch(loaderClose());
    }
  }

  // google authentication
  const googleAuth = async () => {
    try {
      dispatch(loaderOpen());
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      if (user) {
        dispatch(mapItem(user?.uid));
        setUserState(user, "Login successfull");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      dispatch(ToastOpen("Something went wrong"));
    } finally {
      dispatch(loaderClose());
    }
  };
  return (
    <>
      <Container fluid className={Styles.bg__gradient}>
        <Container className="h-100 position-relative py-5">
          <Row className="h-100 align-items-center">
            <Col className="p-0">
              <Card className={Styles.auth__card}>
                <Row>
                  <Col className="px-4 py-3">
                    <Card className="p-3 border-0 shadow">
                      <CardTitle className={Styles.title}>Login</CardTitle>
                      <CardText className={Styles.title__sub}>
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
                            {...register("email", {
                              required: true,
                              pattern:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            })}
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
                            {hide ? (
                              <FaRegEyeSlash
                                onClick={() => {
                                  setHide(!hide);
                                }}
                              />
                            ) : (
                              <FaRegEye
                                onClick={() => {
                                  setHide(!hide);
                                }}
                              />
                            )}
                          </FormLabel>
                          <FormControl
                            placeholder="Password"
                            type={hide ? "password" : "text"}
                            {...register("password", {
                              required: true,
                              minLength: 6,
                            })}
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
                          <FormCheck
                            id="check"
                            checked={checked}
                            onChange={() => {
                              setcheck(!checked);
                            }}
                          />
                          <FormLabel htmlFor="check">Remember Me</FormLabel>
                        </FormGroup>

                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 fs-5 "
                        >
                          Login
                        </Button>
                      </Form>

                      <DropdownDivider className="my-3" />

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
