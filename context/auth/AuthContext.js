
import { createContext, useContext } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';



const inititalState = {
  authReady: false,
  jwt: null,
  user: null,
  login: (data) => {},
  logout: () => {},
  auth: () => {},
  authByOther: (data)=> {}
}
export const AuthContext = createContext(inititalState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}

export const AuthContextProvider = ({children}) => {
  
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  // const { openModal, setModalView, closeModal } = useUI();

  const login = (data) =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/local`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setAuthReady(true);
        setToken(data.jwt);
        setError(null);
        closeModal();
      })
      .catch((error) => {
        setError(error);
        setAuthReady(false);
      });

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthReady(false);
  };

  const authorizeMe = (token) =>
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setError(null);
        setAuthReady(true);
      })
      .catch((error) => {
        setError(error);
        setUser(null);
        setAuthReady(false);
      });

  const auth = () => {
    if (token) {
      authorizeMe(token);
    } else {
      setModalView("LOGIN_VIEW");
      openModal();
    }
  };

  const authByOther = (data) => {
    setUser(data.user);
    setToken(data.jwt);
    setError(false);
    setAuthReady(true);
  };


  const AuthContextValue = {
    user,
    login,
    logout,
    error,
    auth,
    authReady,
    authByOther,
  }
  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  )
}