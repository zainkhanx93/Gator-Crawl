import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  team: {
    one: {
      id: 1,
      firstname: 'Niko',
      lastname: 'Cruz',
      role: 'Project Manager',
      about: 'CSC 648 Student'
    },
    two: {
      id: 2,
      firstname: 'George',
      lastname: 'Freedland',
      role: 'Front-End Team Lead',
      about: 'Finishing juinior year at SFSU'
    },
    three: {
      id: 3,
      firstname: 'Jeffrey',
      lastname: 'Wan',
      role: 'Front-End Developer',
      about: 'Hi everyone! I\'m Jeffrey Wan and I am a senior CS major student.'
    },
    four: {
      id: 4,
      firstname: 'Zain',
      lastname: 'Khan',
      role: 'Front-End Developer',
      about: 'I\'m Zain Khan and I am senior level CS student.'
    },
    five: {
      id: 5,
      firstname: 'Huy',
      lastname: 'Phan',
      role: 'Back-End Developer',
      about: 'I\'m senior Computer Science major of SFSU. Let\'s build an awesome project'
    },
    six: {
      id: 6,
      firstname: 'Jugal',
      lastname: 'Bhatt',
      role: 'Back-End Developer',
      about: 'CSC 648 Student'
    }
  },
  userClicked: null
};

const setUserClicked = (state, action) => {
  // console.log(action.payload.idClicked);
  // console.log(action);
  return {
    ...state,

    userClicked: action.payload.member
  };
};

const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_CLICKED: return setUserClicked(state, action);
    default: return state;
  }
};

export default teamReducer;
