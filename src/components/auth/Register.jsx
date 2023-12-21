import React, { useContext, useState } from "react";
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

import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Loader } from "../index.js";
// css
import Styles from "./auth.module.scss";
import { useSetUser, useUpdateUser } from "./authUtils";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loadfinish, setloading } from "../../redux/auth";
import { ToastOpen } from "../../redux/Toast";
const Register = () => {
  // navigate router
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // custom Hooks
  const [loading, err, updateUser] = useUpdateUser();
  // userform hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // loacal state
  const [hide, setHide] = useState(true);
  const [checked, setCheck] = useState(false);
  // form submission
  async function formSubmit(data) {
    try {
      dispatch(setloading());
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
      dispatch(loadfinish());
    }
  }

  return (
    <>
      <Container fluid className={Styles.bg__gradient}>
        <Link to={"/auth"} className={`${Styles.back__btn} btn `}>
          <IoArrowBack /> Go Back
        </Link>
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col className="p-0">
              <Card className={Styles.auth__card}>
                <Row>
                  <Col className="p-4">
                    <Card className="p-2 border-0">
                      <CardTitle className="fw-medium">Register</CardTitle>
                      <CardText>
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
                            {...register("first_name", { required: true })}
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
                            {...register("last_name", { required: true })}
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
                            {...register("email", { required: true })}
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
                            {...register("password", { required: true })}
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
                              <span>Enter a Valid Password</span>
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
      <Loader loading={loading} />
    </>
  );
};

export default Register;
