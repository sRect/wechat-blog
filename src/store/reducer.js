import * as types from "./types";
import { contData, listData } from "./states";

// https://www.npmjs.com/package/use-immer
export const counterReducer = (draft, action) => {
  switch (action.type) {
    case types.INCREMENT:
      draft.num += action.payload;
      break;
    case types.DECREMENT:
      draft.num -= action.payload;
      break;
    default:
      return contData;
  }
};

// list
export const listPageReducer = (draft, action) => {
  switch (action.type) {
    case types.SET_FILENAME:
      draft.filename = action.payload;
      break;
    case types.SET_LIST_SCROLLTOP:
      draft.scrollTop = action.payload;
      break;
    default:
      return listData;
  }
};
