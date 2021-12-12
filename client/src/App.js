import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AppContext } from "./Components/context/GlobalContext";
import FormLogin from "./Components/FormLogin.jsx";
import FormRegister from "./Components/FormRegister";
import LogoutPage from "./Components/LogoutPage";
import NavigationBar from "./Components/NavigationBar";
import NotificationModal from "./Components/NotificationModal";
import { API, setAuthToken } from "./Config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const [state, dispatch] = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  console.log(state);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      setLoading(false);

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

  const Home = (props) => {
    return (
      <div>
        <NavigationBar /> WELCOME {props.user} TO WEDDING APP
      </div>
    );
  };

  useEffect(() => {
    checkUser();
  }, []);
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <NavigationBar />
      <NotificationModal notif={state.notification} />
      <div className="App">
        {loading ? <h1>LOADING GAES</h1> : null}
        {/* {JSON.stringify(state)} */}

        <Routes>
          <Route
            path="/"
            element={<Home user={state.userData.fullname} exact />}
          />
          <Route
            path="/logout"
            element={state.isLogin ? <LogoutPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={
              state.isLogin ? (
                <Navigate to="/" />
              ) : (
                <FormLogin loading={loading} setLoading={setLoading} />
              )
            }
          />
          <Route
            path="/register"
            element={state.isLogin ? <Navigate to="/" /> : <FormRegister />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
