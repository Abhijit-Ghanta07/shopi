import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/auth";
import { ToastOpen } from "../../redux/Toast";
import { auth } from "../../utils/firebase";
import { updateProfile } from "firebase/auth";

const useSetUser = () => {
  const dispatch = useDispatch();
  const [UserState, setNewUser] = useState(false);

  function setUser(user, message) {
    if (user) {
      dispatch(addUser({ user: user?.providerData[0], userId: user.uid }));
      dispatch(ToastOpen(message));
      setNewUser(true);
    } else {
      dispatch(ToastOpen("sorry Something went Wrong"));
      dispatch(ToastOpen("Try Again After Sometimes"));
      setNewUser(false);
    }
  }

  return [UserState, setUser];
};
const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [, setUserState] = useSetUser();
  const [error, setError] = useState(false);
  async function updateUser(user, first, last) {
    let name = `${first} ${last}`;
    try {
      setLoading(true);
      const res = await updateProfile(user, {
        displayName: name,
        photoURL:
          "https://images.pexels.com/photos/19479502/pexels-photo-19479502/free-photo-of-model-in-a-leather-jacket-and-jeans-crossing-the-street.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      });
      setUserState(auth.currentUser, "your are register successfully");
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }

  return [loading, error, updateUser];
};

export { useSetUser, useUpdateUser };
