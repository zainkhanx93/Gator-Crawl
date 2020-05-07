import * as actionTypes from '../Actions/actionTypes';

const initialState = {

};

const tryRegister = (state, action) => {
  // console.table(action.payload.values);
  return {
    ...state
  };
};

const registerSuccess = (state, action) => {
  console.log(action.payload);
  return {
    ...state
  };
};

const registerFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state
  };
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRY_REGISTER: return tryRegister(state, action);
    case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
    case actionTypes.REGISTER_FAIL: return registerFail(state, action);
    default: return state;
  }
};

export default registerReducer;
