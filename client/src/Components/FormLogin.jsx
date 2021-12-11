import React, { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { API, setAuthToken } from "../Config/api";
import { AppContext } from "./context/GlobalContext";

const FormLogin = () => {
  const [state, dispatch] = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const logginButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/login-user", body);

      console.log(response);

      setLoading(false);
      return dispatch({
        type: "LOGIN",
        payload: response.data,
      });
    } catch (error) {
      setLoading(false);
      dispatch({
        type: "ERROR",
        payload: error.response.data,
      });
    }
  };

  const logoutButton = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(false);
      return dispatch({
        type: "LOGOUT",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      {loading ? <h1>Loading dulu gaes</h1> : <></>}

      <div className="FormLogin">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={state.isLogin ? logoutButton : logginButton}>
            {state.isLogin ? "LOGOUT" : "LOGIN"}
          </Button>
        </Form>
      </div>
      {JSON.stringify(body)}
    </>
  );
};

export default FormLogin;
