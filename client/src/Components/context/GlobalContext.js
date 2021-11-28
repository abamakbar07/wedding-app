import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  context: "globalContext",
  isLogin: false,
  message: "Not Login"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
        localStorage.setItem("LOGIN", true);
    //   localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        message: action.payload.message
        
    };
    // case "AUTH_ERROR":
    // case "LOGIN_REQUEST":
    //   localStorage.setItem(
        //     "loginrequest_code",
        //     action.payload.loginRequest.code
        //   );
    //   return {
    //     ...state,
    //     loginRequest: action.payload.loginRequest,
    //   };
    // case "SET_TOKEN":
    //   localStorage.setItem("token", action.payload.token);
    //   return {
        //     ...state,
        //   };
        case "LOGOUT":
            localStorage.removeItem("LOGIN");
            //   localStorage.removeItem("loginrequest_code");
            return {
                ...state,
                isLogin: false,
                message: action.payload.message
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