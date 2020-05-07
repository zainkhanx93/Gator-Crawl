import * as actionTypes from './actionTypes';

export const setSocket = (socket) => {
  return {
    type: actionTypes.SET_SOCKET,
    payload: { socket }
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: { user }
  };
};
