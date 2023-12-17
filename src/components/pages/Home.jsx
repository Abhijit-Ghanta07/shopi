import React from "react";
import { Header, ToastModal } from "../index.js";
import { Outlet } from "react-router-dom";
import { Footer } from "../layouts/layout.js";
function Home() {
  return (
    <div className="Home-container">
      <Header />
      <Outlet />
      <ToastModal />
      <Footer />
    </div>
  );
}

export default Home;
