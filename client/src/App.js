import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppContext } from "./Components/context/GlobalContext";
import FormLogin from "./Components/FormLogin.jsx";
import NavigationBar from "./Components/NavigationBar";
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

  const Home = () => {
    return <div>WELCOME TO WEDDING APP</div>;
  };

  useEffect(() => {
    checkUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <NavigationBar />
      <div className="App">
        {JSON.stringify(state)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<FormLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
