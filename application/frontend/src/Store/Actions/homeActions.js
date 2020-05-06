import * as actionTypes from './actionTypes';


export const setProducts = (products) => {
  // console.table(products);
  // console.log('hi');
  return {
    type: actionTypes.SET_PRODUCTS,
    payload: { products }
  };
};

export const setCategories = (categories) => {
  // console.log(categories);
  return {
    type: actionTypes.SET_CATEGORIES,
    payload: { categories }
  };
};

export const setFilter = (filter) => {
  // console.log(filter);
  return {
    type: actionTypes.SET_FILTER,
    payload: { filter }
  };
};
