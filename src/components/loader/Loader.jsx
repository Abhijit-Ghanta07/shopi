import React, { useContext, useEffect, useState } from "react";
import { Spinner, ToastBody, ToastHeader } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { close } from "../../context/Toast";

// scss
import Styles from "./loader.module.scss";
export const Loader = ({ loading }) => {
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
  const { show, message } = useSelector((store) => store.toast);
  const dispatch = useDispatch();
  function closeToast(params) {
    dispatch(close());
  }
  // const [show, setShow] = useState(toastState.show);

  return (
    <>
      {createPortal(
        <div className={Styles.toast}>
          <Toast show={show} delay={3000} autohide onClose={closeToast}>
            <ToastHeader className="justify-content-end">
              {/* <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt="close"
                /> */}
            </ToastHeader>
            <ToastBody className={Styles.toast__body}>{message}</ToastBody>
          </Toast>
        </div>,
        document.getElementById("toast")
      )}
    </>
  );
};
