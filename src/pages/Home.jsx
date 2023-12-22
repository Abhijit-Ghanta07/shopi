import React, { Suspense, useEffect } from "react";
import { Loader, ToastModal } from "../components/index.js";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header, Banner } from "../includes/includes.js";

// scss
import Styles from "./page.module.scss";
import { useSelector } from "react-redux";
function Home() {
  const { pathname } = useLocation();
  const { loading } = useSelector((store) => store.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className={Styles.home__wrapper}>
      <Header />
      <Banner />
      <Outlet />
      <ToastModal />
      <Loader loading={loading} />
      <Footer />
    </div>
  );
}

export default Home;
