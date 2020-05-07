import * as actionTypes from './actionTypes';

export const setCurrentUser = (currentUser) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: { currentUser }
  };
};
