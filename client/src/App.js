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
import Loading from "./Components/Loading";
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
        return dispatch({
          type: "USER_LOADED",
          payload: response.data.user,
        });
      }
    } catch (error) {
      setLoading(false);
      return dispatch({
        type: "ERROR",
        payload: error.response,
      });
    }
  };

  const Home = (props) => {
    const loginGa = props.user;
    return (
      <>
        {loginGa === null ? (
          <></>
        ) : props.verified === true ? (
          <>
            <h1>{props.user}</h1>
          </>
        ) : (
          <h1>Verified before use the app </h1>
        )}
        <div>WELCOME TO WEDDING APP</div>
      </>
    );
  };

  useEffect(() => {
    checkUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <NavigationBar />
      <NotificationModal notif={state.notification} error={state.error} />
      <div className="App">
        {/* {JSON.stringify(state)} */}

        <Loading isLoading={loading} />

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
            element={
              state.isLogin ? (
                <Navigate to="/" />
              ) : (
                <FormRegister loading={loading} setLoading={setLoading} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
