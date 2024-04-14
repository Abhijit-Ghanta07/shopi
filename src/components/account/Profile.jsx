import React, { useState } from "react";
import { Button, Col, Container, FormGroup, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastOpen } from "../../services/redux/Toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../../services/firebase/firebase";
import { updateProfile } from "firebase/auth";
import { addUser } from "../../services/redux/auth";
import { loaderOpen, loaderClose } from "../../services/redux/loader";
// scss
import Styles from "./account.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  // local state
  const [inputVal, setInputval] = useState(null);

  // handle input click
  const handleClick = async () => {
    if (inputVal == null) {
      return dispatch(ToastOpen("Please select An Image"));
    }
    dispatch(loaderOpen());
    let imageRef = ref(storage, `profiles/${inputVal.name}`);
    try {
      const res = await uploadBytes(imageRef, inputVal, {
        contentType: "image",
      });
      const downloadUrl = await getDownloadURL(imageRef);
      const updateUser = await updateProfile(auth.currentUser, {
        photoURL: downloadUrl,
      });
      if (downloadUrl) {
        dispatch(
          addUser({
            user: auth.currentUser?.providerData[0],
            userId: auth.currentUser.uid,
          })
        );
        dispatch(loaderClose());
        setInputval(null);
      } else {
        dispatch(ToastOpen("something went wrong"));
        dispatch(loaderClose());
      }
    } catch (err) {
      console.log(err);
    }
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
