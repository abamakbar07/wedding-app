import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  context: "globalContext",
  isLogin: false,
  userData: null,
  loading: true,
  error: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        error: "",
      };
    case "AUTH_ERROR":
      return {
        ...state,
        error: action.payload.message,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
        error: "",
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        userData: null,
        error: "",
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
