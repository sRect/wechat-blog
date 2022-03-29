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
