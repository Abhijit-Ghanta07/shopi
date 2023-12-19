import React from "react";
import { ToastModal } from "../components/index.js";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "../includes/includes.js";

// scss
import Styles from "./page.module.scss";
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
