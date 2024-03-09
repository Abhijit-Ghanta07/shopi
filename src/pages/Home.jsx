import React, { useEffect } from "react";
import { Loader, ToastModal } from "../components/index.js";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header, Banner } from "../includes/includes.js";
import { ScrollTop } from "../utils/Utill.jsx";
// scss
import Styles from "./page.module.scss";
import { useSelector } from "react-redux";
function Home() {
  const loading = useSelector((store) => store.loader);

  return (
    <>
      <div className={Styles.home__wrapper}>
        <Header />
        <Banner />
        <Outlet />
        <Footer />
        <ToastModal />
        <Loader loading={loading} />
      </div>
    </>
  );
}

export default Home;
