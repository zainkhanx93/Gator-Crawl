import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  currentUser: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    major: null,
    token: null,
    profilePhoto: null,
    admin: null
  },
  token: null
};
// Login Window  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const tryLogin = (state) => {
  return {
    ...state
  };
};

const loginSuccess = (state, action) => {
  return {
    ...state,
    currentUser: action.payload.currentUser,
    token: action.payload.token
  };
};

const loginFail = (state, action) => {
  console.log(action.payload.message);
  return {
    ...state,
    currentUser: false,
    token: false
  };
};

const setCurrentUser = (state, action) => {
  console.table(action.payload.currentUser);
  console.log(state.token);
  return {
    ...state,
    currentUser: action.payload.currentUser
  };
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TRY_LOGIN: return tryLogin(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);
    case actionTypes.SET_CURRENT_USER: return setCurrentUser(state, action);
    default: return state;
  }
};

export default loginReducer;
