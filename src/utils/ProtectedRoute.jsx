import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userId } = useSelector((store) => store.auth);
  return userId ? <Navigate to={"/"} /> : children;
};

const UserRoute = ({ children }) => {
  const { userId } = useSelector((store) => store.auth);
  return userId ? children : <Navigate to={"/auth"} />;
};

export { ProtectedRoute, UserRoute };
