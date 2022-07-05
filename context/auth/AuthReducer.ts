type AuthAction = { type: "LOGGED_IN"; data: any } | { type: "LOGIN_FAILED" };

export const AuthReducer = (state: any, action: AuthAction) => {
  switch (action.type) {
    case "LOGGED_IN":
      sessionStorage.setItem(`token`, action.data.jwt);
      sessionStorage.setItem(`user`, JSON.stringify(action.data.user));
      state.user = action.data.user;
      state.authReady = true;
      state.error = null;
      return {
        ...state,
      };
    case "LOGIN_FAILED":
      state.authReady = false;
      return {
        ...state,
      };
    default:
      return state;
  }
};
