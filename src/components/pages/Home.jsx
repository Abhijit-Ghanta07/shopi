import React from "react";
import { Header, ToastModal } from "../index.js";
import { Outlet } from "react-router-dom";
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
