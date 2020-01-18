import { combineReducers } from 'redux';

const userState = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_USER_LOADING":
    case "LOGIN_USER_LOADING":
      return {
        isLoading: true,
        token: null,
        isError: false,
        error: null,
        isLoggedIn: false
      }
    case "CREATE_USER_SUCCESS":
    case "LOGIN_USER_SUCCESS":
      return {
        isLoading: false,
        token: action.token,
        isError: false,
        error: null,
        isLoggedIn: true
      }
    case "CREATE_USER_FAIL":
    case "LOGIN_USER_FAIL":
      return {
        isLoading: false,
        token: null,
        isError: true,
        error: action.payload.errorCode,
        isLoggedIn: false
      }
    default:
      return state;
  }
}

export default combineReducers({
  userState
});