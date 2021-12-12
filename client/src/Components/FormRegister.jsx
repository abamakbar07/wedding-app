import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { API } from "../Config/api";
import { AppContext } from "./context/GlobalContext";

const FormRegister = (props) => {
  const [state, dispatch] = useContext(AppContext);
  const loading = props.loading;
  const setLoading = props.setLoading;

  const [body, setBody] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const registerButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/add-user", body);
      setLoading(false);
      return dispatch({
        type: "REGISTER",
        payload: response.data.message,
      });
    } catch (error) {
      setLoading(false);
      dispatch({
        type: "ERROR",
        payload: error.response.data,
      });
    }
  };

  return (
    <>
      <div className="FormRegister">
        <h1>REGISTER FORM</h1>
        <Form className="bg-light text-black Q Q">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="name"
              name="fullname"
              placeholder="Enter your fullname"
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

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
          <Button variant="primary" onClick={registerButton}>
            REGISTER
          </Button>
        </Form>
      </div>
      {/* {JSON.stringify(body)} */}
    </>
  );
};

export default FormRegister;
