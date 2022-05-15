
import { createContext, useContext, useReducer } from 'react';
import {AuthReducer} from './AuthReducer';



export const inititalState = {
  authReady: false,
  user: null,
  error: null
}
export const AuthContext = createContext(inititalState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, inititalState)

  const login = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({type:'LOGGED_IN', data})
      })
      .catch((error) => {
        dispatch("LOGIN_FAILED")
      });
    }

  const authorize = (token) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook/callback?access_token=${token}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch({type:'LOGGED_IN', data})
          })
          .catch((error) => {
            dispatch("LOGIN_FAILED")
          });
  }

  // const logout = () => {
  //   setUser(null);
  //   setToken(null);
  //   setAuthReady(false);
  // };

  // const authorizeMe = (token) =>
  //   fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data);
  //       setError(null);
  //       setAuthReady(true);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setUser(null);
  //       setAuthReady(false);
  //     });

  // const auth = () => {
  //   if (token) {
  //     authorizeMe(token);
  //   } else {
  //     setModalView("LOGIN_VIEW");
  //     openModal();
  //   }
  // };

  // const authByOther = (data) => {
  //   setUser(data.user);
  //   setToken(data.jwt);
  //   setError(false);
  //   setAuthReady(true);
  // };


  const AuthContextValue = {
    login,
    authorize,
    ...state
  }
  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  )
}