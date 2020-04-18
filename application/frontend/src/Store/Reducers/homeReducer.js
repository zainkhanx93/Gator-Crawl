import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  products: [],
  selectedProduct: []
};

const setProducts = (state, action) => {
  // console.log(action.payload);
  return {
    ...state,
    products: action.payload.products
  };
};

const setSelectedProduct = (state, action) => {
  return {
    ...state,
    selectedProduct: action.payload.selectedProduct
  };
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_PRODUCT: return setSelectedProduct(state, action);
    case actionTypes.SET_PRODUCTS: return setProducts(state, action);
    default: return state;
  }
};

export default homeReducer;
