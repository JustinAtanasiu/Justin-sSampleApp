import { fetchAPI } from '../Service/api/api';

export const createNewUser = (payload, resetFormCb) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'CREATE_USER_LOADING' });
      const response = await fetchAPI("/user/register", 'POST', payload, 200);

      if (response.success) {
        resetFormCb();

        dispatch({ type: 'CREATE_USER_SUCCESS' });
        dispatch({ type: "AUTH_USER_SUCCESS", token: response.token })
        dispatch({ type: 'GET_USER_SUCCESS', payload: response.responseBody });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({ type: 'CREATE_USER_FAIL', payload: error.responseBody });
      return error;
    }
  }
}

export const resetCreateUserError = () => {
  return (dispatch) => {
    dispatch({ type: 'CREATE_USER_INITIAL' });
  }
}

export const loginUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOGIN_USER_LOADING' });
      const response = await fetchAPI("/user/login", 'POST', payload, 200);

      if (response.success) {
        dispatch({ type: 'LOGIN_USER_SUCCESS' });
        dispatch({ type: "AUTH_USER_SUCCESS", token: response.token })
        dispatch({ type: 'GET_USER_SUCCESS', payload: response.responseBody });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_USER_FAIL', payload: error.responseBody });
      return error;
    }
  }
}

export const resetLoginUserError = () => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_INITIAL' });
  }
}

export const resetUserPassword = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'RESET_USER_PASSWORD_LOADING' });
      const response = await fetchAPI("/user/resetPassword", 'POST', payload, 200);

      if (response.success) {
        dispatch({ type: 'RESET_USER_PASSWORD_SUCCESS', payload: response.responseBody });
        return response;
      } else {
        throw response;
      }
    } catch (error) {
      //Do Nothing
    }
  }
}

export const changeResetUserPasswordMessage = () => {
  return (dispatch) => {
    dispatch({ type: 'RESET_USER_PASSWORD_INITIAL' });
  }
}

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      await fetchAPI("/user/logout", "GET", null, 401);
      dispatch({
        type: "USER_LOGGED_OUT_SUCCESS"
      });
    } catch (e) {
      //Do Nothing
    }
  }
}