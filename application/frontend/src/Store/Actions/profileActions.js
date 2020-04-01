import * as actionTypes from './actionTypes';

export const changeFirstName = (firstname) => {
  return {
    type: actionTypes.CHANGE_FIRST_NAME,
    payload: { firstname }
  };
};
