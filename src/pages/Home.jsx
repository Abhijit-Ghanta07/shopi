import React from "react";
import { Header, ToastModal } from "../index.js";
import { Outlet } from "react-router-dom";
import { Footer } from "../layouts/layout.js";

// scss
import Styles from "./page.module.scss";
import { Banner } from "../includes/includes.js";
function Home() {
  return (
    <div className={Styles.home__wrapper}>
      <Header />
      {/* <Banner /> */}
      <Outlet />
      <ToastModal />
      <Footer />
    </div>
  );
}

export default Home;
