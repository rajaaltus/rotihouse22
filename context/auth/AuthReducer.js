

export const AuthReducer = (state,action) => {
  switch(action.type) {
    case 'LOGGED_IN':
      sessionStorage.setItem(`token`,(action.data.jwt))
      sessionStorage.setItem(`user`,JSON.stringify(action.data.user))
      state.user = action.data.user
      state.authReady = true
      state.error = null
      return {
        ...state,
      }
    default:
      return state;
  }
}
