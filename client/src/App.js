import { useContext, useEffect, useState } from "react";
import "./App.css";
import { AppContext } from "./Components/context/GlobalContext";
import FormLogin from "./Components/FormLogin.jsx";
import { API, setAuthToken } from "./Config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.data.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
          payload: {
            message: "Auth failed!",
          },
        });
      }

      if (response.config.headers["Authorization"]) {
        console.log(response);
        dispatch({
          type: "USER_LOADED",
          payload: response.data.user,
        });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data,
      });
    }
  };

  useEffect(() => {
    checkUser();
    // if (!localStorage.LOGIN) {
    //   dispatch({
    //     type: "LOGOUT",
    //     payload: {
    //       message: "You must be login first!",
    //     },
    //   });
    // } else {
    //   dispatch({
    //     type: "LOGIN",
    //     payload: {
    //       message: "Yourelogin Now!",
    //     },
    //   });
    // }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      {JSON.stringify(state)}
      <FormLogin />
    </div>
  );
}

export default App;
