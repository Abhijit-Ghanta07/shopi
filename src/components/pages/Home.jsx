import React, { useContext, useMemo } from "react";
import { Header, ToastModal } from "../index.js";
import { Outlet } from "react-router-dom";
import { StoreContext } from "../../context/store";
import Getdata from "../../data/Getdata";
function Home() {
  return (
    <div className="Home-container">
      <Getdata />
      <Header />
      <Outlet />
      <ToastModal />
    </div>
  );
}

export default Home;
