import * as actionTypes from './actionTypes';

export const addBookmark = (bookmark) => {
  return {
    type: actionTypes.ADD_BOOKMARK,
    payload: { bookmark }
  };
};

export const deleteBookmark = (id) => {
  return {
    type: actionTypes.DELETE_BOOKMARK,
    payload: { id }
  };
};
