import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Stack,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../services/firebase/firebase";
import { ToastOpen } from "../../services/redux/Toast";
import { loaderClose, loaderOpen } from "../../services/redux/loader";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [hide, setHide] = useState(true);
  const [resetState, setReset] = useState(false);

  function changePass(data) {
    if (user?.providerId !== "password") {
      return dispatch(ToastOpen("Sorry You are not Logged In with Password"));
    }
    if (data.new !== data.confirm) {
      return dispatch(ToastOpen("Plase enter same password"));
    }
    // call updete pass fucntion
    dispatch(loaderOpen());
    updatePass(auth.currentUser, data.old, data.new)
      .then((res) => {
        if (!res) {
          return dispatch(ToastOpen("Something went wrong"));
        }
        dispatch(ToastOpen("Password Update Successfull"));
        setReset(true);
        dispatch(loaderClose());
        navigate("/auth");
        dispatch(ToastOpen("Please Sign In again"));
      })
      .catch((err) => {
        dispatch(ToastOpen("Something went wrong"));
      })
      .finally(() => {
        dispatch(loaderClose());
      });
  }

  async function updatePass(user, OldPass, Newpass) {
    const credential = EmailAuthProvider.credential(user.email, OldPass);
    try {
      // authenticate user
      await reauthenticateWithCredential(user, credential);

      // then update the password
      await updatePassword(user, Newpass);

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  useEffect(() => {
    if (resetState) {
      reset();
    }
  }, [resetState]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3 className="text-center">Change Password</h3>
            <Form onSubmit={handleSubmit(changePass)}>
              <FormGroup className="mb-3">
                <FormLabel>Old Password:</FormLabel>
                <FormControl
                  {...register("old", { required: true, minLength: 6 })}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>New Password:</FormLabel>
                <FormControl
                  {...register("new", { required: true, minLength: 6 })}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel
                  className="d-flex justify-content-between"
                  role="button"
                >
                  Confirm Password:
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
                  type={hide ? "password" : "text"}
                  {...register("confirm", { required: true, min: 6 })}
                />
              </FormGroup>
              <Stack direction="horizontal" className="justify-content-between">
                <Button variant="primary" type="submit">
                  Change Password
                </Button>
                <p>Forget Password</p>
              </Stack>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPass;
