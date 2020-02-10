import * as actionTypes from './actionTypes';

export const setUserClicked = (member) => {
  return {
    type: actionTypes.SET_USER_CLICKED,
    payload: { member }
  };
};
