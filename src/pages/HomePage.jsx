import { Loader, ToastModal } from "../components/index.js";
import { Outlet } from "react-router-dom";
import { Footer, Header, Banner, Category } from "../includes/includes.js";
import { useSelector } from "react-redux";
import { ScrollTop } from "../utils/Utill.jsx";
// scss
import Styles from "./page.module.scss";

function Home() {
  // globals state
  const loading = useSelector((store) => store.loader);

  return (
    <>
      <ScrollTop />
      <div className={Styles.home__wrapper}>
        <Header />
        <Banner />
        <Category />
        <Outlet />
        <Footer />
        <Loader loading={loading} />
      </div>
    </>
  );
}

export default Home;
