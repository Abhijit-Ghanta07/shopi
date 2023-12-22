import React, { useState } from "react";
import { Button, Col, Container, FormGroup, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastOpen } from "../../redux/Toast";
// scss
import Styles from "./account.module.scss";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../utils/firebase";
import { updateProfile } from "firebase/auth";
import { addUser, loadfinish, setloading } from "../../redux/auth";
const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [inputVal, setInputval] = useState(null);

  const handleClick = async () => {
    if (inputVal == null) {
      console.log("hello");
      return dispatch(ToastOpen("Please select An Image"));
    }
    dispatch(setloading());
    let imageRef = ref(storage, `profiles/${inputVal.name}`);
    const res = await uploadBytes(imageRef, inputVal, { contentType: "image" });
    const downloadUrl = await getDownloadURL(imageRef);
    const updateUser = await updateProfile(auth.currentUser, {
      photoURL: downloadUrl,
    });
    dispatch(
      addUser({
        user: auth.currentUser?.providerData[0],
        userId: auth.currentUser.uid,
      })
    );
  };
  return (
    <>
      <Container>
        <Row>
          <Col sm="4">
            <img
              src={user?.photoURL}
              alt="profile image"
              className={Styles.profile__img}
            />
          </Col>
          <Col sm="7">
            <Stack direction="vertical" className="p-3">
              <FormGroup>
                FullName:
                <p>{user.displayName}</p>
              </FormGroup>
              <FormGroup>
                E-mail:
                <p>{user.email}</p>
              </FormGroup>
              <FormGroup>
                PhoneNumber:
                <p>{user.phoneNumber ? phoneNumber : "Not Available"}</p>
              </FormGroup>
              <FormGroup className="mb-3">
                Update Profile Photo:
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setInputval(e.target.files[0])}
                />
              </FormGroup>
              <Button variant="primary" onClick={handleClick}>
                Update Profile
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
