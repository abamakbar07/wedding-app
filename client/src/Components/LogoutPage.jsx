import React, { useContext, useEffect } from "react";
import { AppContext } from "./context/GlobalContext";

const LogoutPage = () => {
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: "LOGOUT",
    });
  }, []);

  return (
    <div>
      <h1>Logging out your account!</h1>
    </div>
  );
};

export default LogoutPage;
