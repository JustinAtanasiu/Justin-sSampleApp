import { fetchAPI } from '../Service/api/api';

export const createNewUser = (payload, resetFormCb) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'CREATE_USER_LOADING' });
      const response = await fetchAPI("/user/register", 'POST', payload, 200);
      if (response.success) {
        dispatch({ type: 'CREATE_USER_SUCCESS', token: response.token });
        dispatch({ type: 'GET_USER_SUCCESS', payload: response.responseBody });
        resetFormCb();
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({ type: 'CREATE_USER_FAIL', payload: error.responseBody });
    }
  }
}

export const loginUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOGIN_USER_LOADING' });
      const response = await fetchAPI("/user/login", 'POST', payload, 200);
      if (response.success) {
        dispatch({ type: 'LOGIN_USER_SUCCESS', token: response.token });
        dispatch({ type: 'GET_USER_SUCCESS', payload: response.responseBody });
      } else {
        throw response;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_USER_FAIL', payload: error.responseBody });
    }
  }
}