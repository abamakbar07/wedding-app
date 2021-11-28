import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AppContext } from "./context/GlobalContext";

const FormLogin = () => {
  const [state, dispatch] = useContext(AppContext);

  const logginButton = (e) => {
    e.preventDefault();
    if (state.isLogin) {
      return dispatch({
        type: "LOGOUT",
        payload: {
          message: "Need login!",
        },
      });
    } else {
      return dispatch({
        type: "LOGIN",
        payload: {
          message: "Login Success!",
        },
      });
    }
  };

  return (
    <div className="FormLogin">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" onClick={logginButton}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FormLogin;
