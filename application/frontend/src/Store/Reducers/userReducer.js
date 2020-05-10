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
  }
};

const setCurrentUser = (state, action) => {
  console.table(action.payload.currentUser);
  return {
    ...state,
    currentUser: action.payload.currentUser

  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.SET_CURRENT_USER: return setCurrentUser(state, action);
    default: return state;
  }
};

export default userReducer;
