import { Loader, ToastModal } from "../components/index.js";
import { Outlet } from "react-router-dom";
import { Footer, Header, Banner } from "../includes/includes.js";
import { useSelector } from "react-redux";
// scss
import Styles from "./page.module.scss";

function Home() {
  // globals state
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
