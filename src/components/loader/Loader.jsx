import React, { useContext, useEffect, useState } from "react";
import { Spinner, ToastBody, ToastHeader } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
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

export const ToastModal = () => {
  function closeToast(params) {
    // dispatch({ type: "close" });
  }
  // const [show, setShow] = useState(toastState.show);

  // useEffect(() => {
  //   setShow(toastState.show);
  // }, [toastState]);
  // console.log(show);
  return (
    <>
      {createPortal(
        <div className={Styles.toast}>
          <Toast
            // show={toastState.show}
            delay={3000}
            autohide
            onClose={closeToast}
          >
            <ToastHeader className="justify-content-end">
              {/* <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt="close"
                /> */}
            </ToastHeader>
            <ToastBody className={Styles.toast__body}>
              {/* {toastState.message} */}
              this is toast
            </ToastBody>
          </Toast>
        </div>,
        document.getElementById("toast")
      )}
    </>
  );
};

export default Loader;
