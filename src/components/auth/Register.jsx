import React, { useState } from "react";
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
  Row,
} from "react-bootstrap";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useUpdateUser } from "./authUtils";
import { useDispatch } from "react-redux";
import { ToastOpen } from "../../redux/Toast";
import { loaderClose, loaderOpen } from "../../redux/loader";
// css
import Styles from "./auth.module.scss";

const Register = () => {
  // navigate router
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // custom Hooks
  const [, err, updateUser] = useUpdateUser();
  // userform hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // loacal state
  const [hide, setHide] = useState(true);
  const [checked, setCheck] = useState(true);
  // form submission
  async function formSubmit(data) {
    try {
      dispatch(loaderOpen());
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (res) {
        await updateUser(res.user, data.first_name, data.last_name);
        navigate("/");
      }
    } catch (error) {
      dispatch(ToastOpen("Something wrong! Try after sometimes"));
      console.log(error);
    } finally {
      dispatch(loaderClose());
    }
  }

  return (
    <>
      <Container fluid className={Styles.bg__gradient}>
        <Container className="h-100 py-5">
          <Row className="h-100 align-items-center">
            <Col className="p-0">
              <Card className={Styles.auth__card}>
                <Row>
                  <Col className="p-4">
                    <Card className="p-2 border-0">
                      <CardTitle className={Styles.title}>Register</CardTitle>
                      <CardText className={Styles.title__sub}>
                        Have An Account?
                        <Link to={"/auth"} className=" py-3">
                          Login
                        </Link>
                        {/* <div className="d-flex justify-content-center gap-3 mt-2">
                          <Link
                            className="icon-link btn btn-outline-primary"
                            onClick={facebookAuth}
                          >
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
                        </div> */}
                      </CardText>
                      <Form onSubmit={handleSubmit(formSubmit)}>
                        <FormGroup>
                          <FormLabel>First Name:</FormLabel>
                          <FormControl
                            placeholder="John"
                            type="text"
                            {...register("first_name", {
                              required: true,
                              maxLength: 15,
                            })}
                            aria-invalid={errors.first_name ? "true" : "false"}
                            autoComplete="true"
                          />
                          <p
                            className={
                              errors.first_name
                                ? "text-danger visible m-0"
                                : "invisible m-0"
                            }
                          >
                            {errors.first_name?.type === "required" ? (
                              <span>Name is Required</span>
                            ) : (
                              <span>Enter a Valid Name</span>
                            )}
                          </p>
                        </FormGroup>
                        <FormGroup>
                          <FormLabel>Last Name:</FormLabel>
                          <FormControl
                            placeholder="Doe"
                            type="text"
                            {...register("last_name", {
                              required: true,
                              maxLength: 10,
                            })}
                            aria-invalid={errors.last_name ? "true" : "false"}
                            autoComplete="true"
                          />
                          <p
                            className={
                              errors.last_name
                                ? "text-danger visible m-0"
                                : "invisible m-0"
                            }
                          >
                            {errors.last_name?.type === "required" ? (
                              <span>Name is Required</span>
                            ) : (
                              <span>Enter a Valid Name</span>
                            )}
                          </p>
                        </FormGroup>
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
                            autoComplete="true"
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
                              maxLength: 10,
                            })}
                            autoComplete="true"
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
                              <span>Enter a password min 6 Letters</span>
                            )}
                          </p>
                        </FormGroup>
                        <FormGroup className="d-flex gap-2">
                          <FormCheck
                            id="check"
                            checked={checked}
                            onChange={() => {
                              setCheck(!checked);
                            }}
                          />
                          <FormLabel htmlFor="check">Stay Login</FormLabel>
                        </FormGroup>

                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 fs-6 mt-2 "
                        >
                          Register
                        </Button>
                      </Form>
                    </Card>
                  </Col>
                  <Col md className="py-4">
                    <div className={Styles.card__img__register}></div>
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

export default Register;
