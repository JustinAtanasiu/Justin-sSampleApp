import { combineReducers } from 'redux';

const authData = (state = {}, action) => {
  switch (action.type) {
    case "AUTH_USER_SUCCESS":
      return {
        token: action.token,
        isLoggedIn: true
      }

    case "AUTH_USER_FAIL":
      return {
        token: null,
        isLoggedIn: false
      }
    default:
      return state;
  }
}

const createUser = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_USER_INITIAL": {
      return {
        isLoading: false,
        isError: false,
        error: null
      }
    }
    case "CREATE_USER_LOADING":
      return {
        isLoading: true,
        isError: false,
        error: null
      }
    case "CREATE_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        error: null
      }
    case "CREATE_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        error: action.payload.errorCode
      }
    default:
      return state;
  }
}

const loginUser = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_USER_INITIAL": {
      return {
        isLoading: false,
        isError: false,
        error: null
      }
    }
    case "LOGIN_USER_LOADING":
      return {
        isLoading: false,
        isError: false,
        error: null
      }
    case "LOGIN_USER_SUCCESS":
      return {
        isLoading: false,
        isError: false,
        error: null
      }
    case "LOGIN_USER_FAIL":
      return {
        isLoading: false,
        isError: true,
        error: action.payload.errorCode
      }
    default:
      return state;
  }
}

const resetUserPassword = (state = {}, action) => {
  switch (action.type) {
    case "RESET_USER_PASSWORD_INITIAL": {
      return {
        isLoading: false,
        resetMessageCode: null
      }
    }
    case "RESET_USER_PASSWORD_LOADING":
      return {
        isLoading: true,
        resetMessageCode: null
      }
    case "RESET_USER_PASSWORD_SUCCESS":
      return {
        isLoading: false,
        resetMessageCode: action.payload.messageCode
      }
    default:
      return state;
  }
}

export default combineReducers({
  createUser,
  loginUser,
  resetUserPassword,
  authData
});