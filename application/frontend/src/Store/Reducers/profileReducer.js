import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  myprofile: {
    firstname: 'Bob',
    lastname: 'Burgers',
    major: 'Computer Science'
  }
};

const changeFirstName = (state, action) => {
  // console.log('change name called in reducer to change the name');
  return {
    ...state,
    myprofile: {
      firstname: action.payload.firstname,
      lastname: state.myprofile.lastname,
      major: state.myprofile.major
    }
  };
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_FIRST_NAME: return changeFirstName(state, action);
    default: return state;
  }
};

export default profileReducer;
