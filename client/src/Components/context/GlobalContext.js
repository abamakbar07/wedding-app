import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  context: "globalContext",
  isLogin: false,
  userData: {
    fullname: null,
  },
  auth: {
    status: false,
    message: null,
  },
  error: {
    status: false,
    message: null,
  },
  notification: {
    status: false,
    message: null,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        userData: action.payload.user,
        error: {
          status: false,
          message: null,
        },
      };
    case "REGISTER":
      return {
        ...state,
        notification: {
          status: true,
          message: action.payload,
        },
      };
    case "AUTH_ERROR":
      return {
        ...state,
        auth: {
          status: false,
          message: action.payload.message,
        },
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        auth: {
          status: true,
          message: "User Authorized",
        },
        userData: action.payload,
        error: {
          status: false,
          message: null,
        },
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        userData: {
          fullname: null,
        },
        error: {
          status: false,
          message: null,
        },
      };
    case "PUSH_NOTIF":
      return {
        ...state,
        notification: {
          status: true,
          message: action.payload,
        },
      };
    case "CLOSE_NOTIF":
      return {
        ...state,
        notification: {
          status: false,
          message: null,
        },
        error: {
          status: false,
          message: null,
        },
      };
    case "ERROR":
      return {
        ...state,
        error: {
          status: true,
          message: action.payload,
        },
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
