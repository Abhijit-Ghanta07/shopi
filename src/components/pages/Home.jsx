import React from "react";
import { Header, ToastModal } from "../index.js";
import { Outlet } from "react-router-dom";
import { Footer } from "../layouts/layout.js";
import { Banner } from "../includes/includes.js";
function Home() {
  return (
    <div className="Home-container">
      <Header />
      {/* <Banner /> */}
      <Outlet />
      <ToastModal />
      <Footer />
    </div>
  );
}

export default Home;
