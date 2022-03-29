import * as types from "./types";
import { contData } from "./states";

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
