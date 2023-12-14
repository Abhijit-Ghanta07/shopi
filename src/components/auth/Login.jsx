import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
} from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store";
const Login = () => {
  const navigate = useNavigate();
  const {
    user: [userState, dispatch],
  } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    if (email !== "" || pass !== "") {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          pass
        );
        const logUser = userCredential.user;
        if (logUser) {
          setUser(logUser);
        }
      } catch (err) {
        setErr(true);
      }
    }
  }
  function setUser(user) {
    if (user) {
      dispatch({ type: "setuser", payload: user?.providerData[0] });
      navigate("/");
    }
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel>Enter Email:</FormLabel>
                <FormControl
                  placeholder="Example@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <FormLabel>Enter Password:</FormLabel>
                <FormControl
                  placeholder="Password"
                  type="text"
                  value={pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </FormGroup>

              <Button variant="primary" type="submit">
                Login
              </Button>
              {err && (
                <FormText className="text-danger">
                  Enter Corret Details
                </FormText>
              )}
            </Form>
            <Link to={"/register"} className="text-decoration-none py-3">
              Register
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
