import { useState } from "react";
import { useDispatch } from "react-redux";
import { ToastOpen } from "../services/redux/Toast";
import { addUser } from "../services/redux/auth";

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

export default useSetUser;
