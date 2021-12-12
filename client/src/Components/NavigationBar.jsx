import React, { useContext } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from "./context/GlobalContext";

const NavigationBar = () => {
  const [state, dispatch] = useContext(AppContext);

  return (
    <div className="container-fluid p-0">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto justify-content-between">
          {state.isLogin ? (
            <Link to="logout">Logout</Link>
          ) : (
            <>
              <Link to="login">Login</Link>
              <Link to="register">Register</Link>
            </>
          )}
        </Nav>
        <Form inline>
          {/* <Form.Control type="text" placeholder="Search" className="mr-sm-2" /> */}
          <Button
            variant="outline-info"
            onClick={() =>
              dispatch({
                type: "PUSH_NOTIF",
                payload: "TEST",
              })
            }>
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
