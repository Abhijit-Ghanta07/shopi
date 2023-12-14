import React, { useContext } from "react";
import { StoreContext } from "../context/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const {
    user: [userState],
  } = useContext(StoreContext);

  return userState.currentUser ? <Navigate to={"/"} /> : children;
};

const UserRoute = ({ children }) => {
  const {
    user: [userState],
  } = useContext(StoreContext);
  return userState.currentUser ? children : <Navigate to={"/auth"} />;
};

export { ProtectedRoute, UserRoute };
