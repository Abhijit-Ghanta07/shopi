import React from "react";
import { Header, ToastModal } from "../index.js";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div className="Home-container">
      <Header />
      <Outlet />
      <ToastModal />
    </div>
  );
}

export default Home;
