import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/GlobalContext";

const NotificationModal = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(AppContext);
  const isRegister = props.notif.message === "User successfully registered!";
  const isError = props.error.status;
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    if (isRegister) navigate("/login");
    setShow(false);
    return dispatch({
      type: "CLOSE_NOTIF",
    });
  };

  const notif = () => {
    if (props.notif.status || props.error.status) {
      handleShow();
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    notif(); // eslint-disable-next-line
  }, [state.notification.status || state.error.status]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.notif.message || props.error.message}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant={isError ? "danger" : "primary"}
            onClick={handleClose}>
            {isRegister ? "Login now" : "Understod"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotificationModal;
