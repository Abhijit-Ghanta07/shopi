import React, { useState } from "react";
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

const ResetPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hide, setHide] = useState(true);

  function changePass(data) {
    console.log(data);
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit(changePass)}>
              <FormGroup className="mb-3">
                <FormLabel>Current Password:</FormLabel>
                <FormControl {...register("current", { required: true })} />
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
