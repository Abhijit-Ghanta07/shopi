import React from "react";
import { Button, Spinner, ToastBody, ToastHeader } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastClose } from "../../services/redux/Toast";

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
  function closeToast() {
    dispatch(ToastClose());
  }

  return (
    <>
      {createPortal(
        <div className={Styles.toast}>
          <Toast show={show} delay={3000} autohide onClose={closeToast}>
            <ToastBody className={Styles.toast__body}>{message}</ToastBody>
          </Toast>
        </div>,
        document.getElementById("toast")
      )}
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <div className={Styles.loading}>
        <Spinner
          as="span"
          animation="border"
          variant="dark"
          size="lg"
          role="status"
          aria-hidden="true"
        />
        <h3>Loading...</h3>
      </div>
    </>
  );
};
