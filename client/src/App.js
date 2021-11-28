import { useContext, useEffect } from 'react';
import './App.css';
import { AppContext } from './Components/context/GlobalContext';
import FormLogin from './Components/FormLogin.jsx';

function App() {
  const [state, dispatch] = useContext(AppContext)

  useEffect(() => {
      if (!localStorage.LOGIN) {
        dispatch({
          type: "LOGOUT",
          payload: {
            message: "You must be login first!"
          }
        })
      } else {
        dispatch({
          type: "LOGIN",
          payload: {
            message: "Yourelogin Now!"
          }
        })
      }
    }, [])

  return (
    <div className="App">
      {JSON.stringify(state)}
      <FormLogin />
    </div>
  );
}

export default App;
