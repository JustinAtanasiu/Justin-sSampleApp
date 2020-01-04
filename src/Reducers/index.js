import { combineReducers } from 'redux';

import authReducer from "./auth.reducers";

const reducers = {
  authReducer
};

export default combineReducers(reducers);