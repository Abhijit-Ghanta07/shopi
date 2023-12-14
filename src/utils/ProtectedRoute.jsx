import React, { useContext } from "react";
import { StoreContext } from "../context/store";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const {
    user: [userState],
  } = useContext(StoreContext);

  return Object.keys(userState).length > 0 ? <Navigate to={"/"} /> : children;
};

const UserRoute = ({ children }) => {
  const {
    user: [userState],
  } = useContext(StoreContext);
  return Object.keys(userState).length > 0 ? (
    children
  ) : (
    <Navigate to={"/auth"} />
  );
};

export { ProtectedRoute, UserRoute };
