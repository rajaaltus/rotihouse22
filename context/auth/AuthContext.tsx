import { createContext, useReducer } from "react";
import { LoginRequest, AuthState } from "../../helpers/types";
import { AuthReducer } from "./AuthReducer";

export const inititalState: AuthState = {
  authReady: false,
  user: {},
  error: "",
  authorize: () => {},
  login: () => {},
};

export const AuthContext = createContext<AuthState>(inititalState);

const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, inititalState);

  const login = (data: LoginRequest) => {
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
        dispatch({ type: "LOGGED_IN", data });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILED" });
      });
  };

  const authorize = (access_token: string, provider: string) => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/callback?access_token=${access_token}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "LOGGED_IN", data });
      })
      .catch((error) => {
        dispatch({ type: "LOGIN_FAILED" });
      });
  };

  const AuthContextValue = {
    login,
    authorize,
    ...state,
  };
  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
