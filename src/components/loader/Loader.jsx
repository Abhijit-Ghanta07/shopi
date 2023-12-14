import React from "react";
import { Spinner } from "react-bootstrap";
import { createPortal } from "react-dom";
import Styles from "./loader.module.scss";
const Loader = ({ loading }) => {
  return (
    <>
      {loading &&
        createPortal(
          <div className={Styles.loader__overlay}>
            <Spinner animation="border" role="status"></Spinner>
          </div>,
          document.getElementById("modal")
        )}
    </>
  );
};

export default Loader;
