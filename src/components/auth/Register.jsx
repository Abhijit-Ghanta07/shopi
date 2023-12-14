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

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/store";
const Register = () => {
  const navigate = useNavigate();
  const {
    user: [userState, dispatch],
  } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [err, setErr] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" || pass !== "") {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        const user = userCredentials.user;
        if (user) {
          updateUser(user);
        }
      } catch (err) {
        setErr(true);
      }
    }
  }
  function updateUser(user) {
    console.log(user);

    updateProfile(user, {
      displayName: "Admin",
      photoURL:
        "https://images.pexels.com/photos/18825491/pexels-photo-18825491/free-photo-of-man-in-a-costume-of-a-hindu-deity-sitting-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    }).then(() => {
      dispatch({ type: "setuser", payload: auth.currentUser?.providerData[0] });
      navigate("/");
    });
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <FormLabel>Enter UserName:</FormLabel>
                <FormControl
                  placeholder="username"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </FormGroup>

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
                Register
              </Button>
              {err && (
                <FormText className="text-danger">
                  Enter Corret Details
                </FormText>
              )}
            </Form>
            <Link to={"/login"} className="text-decoration-none py-3">
              Login
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
