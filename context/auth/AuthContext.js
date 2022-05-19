
import { createContext, useContext, useReducer } from 'react';
import {AuthReducer} from './AuthReducer';



export const inititalState = {
  authReady: false,
  user: null,
  error: null
}
export const AuthContext = createContext(inititalState);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   return context;
// }

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

  const authorize = (access_token, provider) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/callback?access_token=${access_token}`, {
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

  // const me = (token) => {
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me=${token}`, {
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       dispatch({type:'LOGGED_IN', data})
  //     })
  //     .catch((error) => {
  //       dispatch("LOGIN_FAILED")
  //     });
  // }


  const AuthContextValue = {
    login,
    authorize,
    // me,
    ...state
  }
  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  )
}