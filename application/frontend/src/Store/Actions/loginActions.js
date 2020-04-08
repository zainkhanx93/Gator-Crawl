import * as actionTypes from './actionTypes';

// LOGIN ACTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const tryLogin = (values, callback) => {
  // console.log('trylogin acction');
  return {
    type: actionTypes.TRY_LOGIN,
    payload: { values, callback }
  };
};

export const loginSuccess = (payload) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload
  };
};

export const loginFail = (payload) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    payload
  };
};
