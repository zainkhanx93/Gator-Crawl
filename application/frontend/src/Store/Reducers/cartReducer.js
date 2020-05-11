// import * as cartActions from '../Actions/cartActions';
import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  bookmarks: []
};

const addBookmark = (state, action) => {
  // console.log(action.payload);
  alert('You added a bookmark!');
  return {
    ...state,
    bookmarks: [...state.bookmarks, action.payload.bookmark]
  };
};

const deleteBookmark = (state, action) => {
  // console.log(action.payload);
  const array = [...state.bookmarks];
  array.splice(action.payload.id, 1);

  // console.log(action.payload.id);
  // console.log(index);
  // return +action.payload.id !== (index - 1);
  // });
  return {
    ...state,
    bookmarks: array
  };
};


const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.SET_SOCKET: return setSocket(state, action);
    // case actionTypes.SET_USER: return setUser(state, action);
    case actionTypes.ADD_BOOKMARK: return addBookmark(state, action);
    case actionTypes.DELETE_BOOKMARK: return deleteBookmark(state, action);
    default: return state;
  }
};

export default cartReducer;
