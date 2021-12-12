import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";

const NotificationModal = (props) => {
  const navigate = useNavigate();
  const isRegister = props.notif.message == "User successfully registered!";
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    if (isRegister) navigate("/login");
    setShow(false);
  };

  const notif = () => {
    if (props.notif.status) {
      handleShow();
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    notif();
  }, [props]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{props.notif.message}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {isRegister ? "Login now" : "Understod"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotificationModal;
