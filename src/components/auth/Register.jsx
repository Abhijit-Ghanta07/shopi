import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from "react-bootstrap";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store";
import { useForm } from "react-hook-form";
import { FaAward, FaRegEyeSlash } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

// css
import Styles from "./auth.module.scss";
const Register = () => {
  const navigate = useNavigate();
  const {
    user: [userState, dispatch],
  } = useContext(StoreContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hide, setHide] = useState(true);
  async function formSubmit(data) {
    try {
      dispatch({ type: "setloading" });
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (res) {
        updateUser(res.user, data.name);
      }
    } catch (error) {
    } finally {
      dispatch({ type: "loadfinish" });
    }
  }
  function updateUser(user, name) {
    updateProfile(user, {
      displayName: name,
      photoURL:
        "https://images.pexels.com/photos/18825491/pexels-photo-18825491/free-photo-of-man-in-a-costume-of-a-hindu-deity-sitting-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }).then(() => {
      dispatch({ type: "setuser", payload: auth.currentUser?.providerData[0] });
      navigate("/");
    });
  }
  const facebookAuth = async () => {
    console.log("auth click facebookAuth");
  };
  const googleAuth = async () => {
    console.log("auth click googleAuth");
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
                      <CardTitle>Register</CardTitle>
                      <CardText>
                        Have An Account?
                        <Link to={"/auth"} className=" py-3">
                          Login
                        </Link>
                        <div className="d-flex justify-content-center gap-3 mt-2">
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
                        </div>
                      </CardText>
                      <Form onSubmit={handleSubmit(formSubmit)}>
                        <FormGroup>
                          <FormLabel>Enter Your Name:</FormLabel>
                          <FormControl
                            placeholder="John Doe"
                            type="text"
                            {...register("name", { required: true })}
                            aria-invalid={errors.name ? "true" : "false"}
                            autoComplete=""
                          />
                          <p
                            className={
                              errors.name
                                ? "text-danger visible m-0"
                                : "invisible m-0"
                            }
                          >
                            {errors.name?.type === "required" ? (
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
                        {/* <FormGroup className="d-flex gap-2">
                          <FormCheck />
                          <FormLabel>Remember Me</FormLabel>
                        </FormGroup> */}

                        <Button
                          variant="primary"
                          type="submit"
                          className="w-100 fs-6 mt-2 "
                        >
                          Register
                        </Button>
                      </Form>
                      <CardText className="text-center mt-1">
                        <hr className="mb-2" />
                      </CardText>
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
