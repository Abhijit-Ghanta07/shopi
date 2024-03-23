import React, { useState } from "react";
import { auth } from "../../services/firebase/firebase";
import { updateProfile } from "firebase/auth";
import useSetUser from "../../hooks/UseSetUser";

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
      if (res) {
        setUserState(auth.currentUser, "your are register successfully");
      }
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  }

  return { loading, error, updateUser };
};

export { useUpdateUser };
