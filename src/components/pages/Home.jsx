import React, { useContext, useMemo } from "react";
import { Header } from "../index.js";
import { Outlet } from "react-router-dom";
import { StoreContext } from "../../context/store";
import Getdata from "../../data/Getdata";
function Home() {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <div className="Home-container">
      {/* <Getdata /> */}
      <Header />
      {/* <Outlet /> */}
    </div>
  );
}

export default Home;
