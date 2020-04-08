import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  token: null,
  id: null
};
// LOGIN WINDOW ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tryLogin = (state) => {
  // console.log(action.payload.values);
  // console.log('login reducer');
  return {
    ...state
  };
};

const loginSuccess = (state, action) => {
  // console.log(action.payload.token);
  return {
    ...state,
    token: action.payload.token
  };
};

const loginFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state,
    token: false
  };
};


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRY_LOGIN: return tryLogin(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);
    default: return state;
  }
};

export default loginReducer;
