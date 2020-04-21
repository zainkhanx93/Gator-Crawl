import * as actionTypes from './actionTypes';

// REGISTER ACTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const tryRegister = (values) => {
  // console.log('try register action');
  return {
    type: actionTypes.TRY_REGISTER,
    payload: { values }
  };
};

export const registerSuccess = (payload) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload
  };
};

export const registerFail = (payload) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    payload
  };
};
