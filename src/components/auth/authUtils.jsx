import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, setloading } from "../../redux/auth";
import { ToastOpen } from "../../redux/Toast";
import { auth } from "../../utils/firebase";
import { updateProfile } from "firebase/auth";

const useSetUser = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(false);

  function setUser(user, message) {
    if (user) {
      dispatch(addUser({ user: user?.providerData[0], userId: user.uid }));
      dispatch(ToastOpen(message));
      setNewUser(true);
    } else {
      dispatch(ToastOpen("sorry Something went Wrong"));
    }
  }

  return [newUser, setUser];
};
const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useSetUser();
  async function updateUser(user, name) {
    setLoading(true);
    const res = await updateProfile(user, {
      displayName: name,
      photoURL:
        "https://images.pexels.com/photos/18825491/pexels-photo-18825491/free-photo-of-man-in-a-costume-of-a-hindu-deity-sitting-on-the-floor.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    });
    if (res) {
      setUserState(auth.currentUser, "your are register successfully");
      setLoading(false);
    }
  }

  return [loading, updateUser];
};

export { useSetUser, useUpdateUser };
