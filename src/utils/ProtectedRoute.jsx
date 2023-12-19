import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const { userId } = useSelector((store) => store.auth);
  return userId ? <Navigate to={"/"} /> : children;
};

const GuestProtected = ({ children }) => {
  const { userId } = useSelector((store) => store.auth);
  return userId ? children : <Navigate to={"/auth"} />;
};

export { GuestProtected, UserProtected };
