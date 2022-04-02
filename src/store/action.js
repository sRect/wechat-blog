import * as types from "./types";

export const increment = (num = 1) => {
  return {
    type: types.INCREMENT,
    payload: num,
  };
};

export const decrement = (num = 1) => {
  return {
    type: types.DECREMENT,
    payload: num,
  };
};

// list
export const setFilename = (filename) => ({
  type: types.SET_FILENAME,
  payload: filename,
});

export const setListScrollTop = (scrollTop = 0) => ({
  type: types.SET_LIST_SCROLLTOP,
  payload: scrollTop,
});
