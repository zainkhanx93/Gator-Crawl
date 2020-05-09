import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  socket: null,
  user: null,
  otherUsers: [],
};

// const changeFirstName = (state, action) => {
//   // console.log('change name called in reducer to change the name');
//   return {
//     ...state,
//     myprofile: {
//       firstname: action.payload.firstname,
//       lastname: state.myprofile.lastname,
//       major: state.myprofile.major
//     }
//   };
// };

const setSocket = (state, action) => {
  return {
    ...state,
    socket: action.payload.socket
  };
};

const setUser = (state, action) => {
  return {
    ...state,
    user: action.payload.user
  };
};

const addOtherUsers = (state, action) => {
  return {
    ...state,
    otherUsers: [state.user, ...action.otherUsers]
  };
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SOCKET: return setSocket(state, action);
    case actionTypes.SET_USER: return setUser(state, action);
    case actionTypes.ADD_OTHER_USER: return addOtherUsers(state, action);
    default: return state;
  }
};

export default messageReducer;
