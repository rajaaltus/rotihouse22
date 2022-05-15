

export const AuthReducer = (state,action) => {
  switch(action.type) {
    case 'LOGGED_IN':
      console.log(action.data)
      sessionStorage.setItem(`token`,(action.data.jwt))
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
