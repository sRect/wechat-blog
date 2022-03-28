import * as types from "./types";

export const increment = (num) => {
  return {
    type: types.INCREMENT,
    payload: num,
  };
};

export const decrement = (num) => {
  return {
    type: types.DECREMENT,
    payload: num,
  };
};
