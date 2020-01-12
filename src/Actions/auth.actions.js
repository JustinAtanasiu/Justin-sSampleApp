import { fetchAPI } from '../Service/api/api';

export const createNewUser = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'CREATE_USER_LOADING' });
      const response = await fetchAPI("/user/create", 'POST', payload, 200);
      if (response.success) {
        dispatch({ type: 'CREATE_USER_SUCCESS', token: response.token });
        dispatch({ type: 'GET_USER_SUCCESS', payload: response.responseBody });
      } else {
        throw response;
      }
    } catch (e) {
      dispatch({ type: 'CREATE_USER_FAIL', payload: response.responseBody });
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
    } catch (e) {
      dispatch({ type: 'LOGIN_USER_FAIL', payload: response.responseBody });
    }
  }
}