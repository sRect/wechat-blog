import * as types from "./types";
import { contData } from "./states";

// https://www.npmjs.com/package/use-immer
export const counterReducer = (draft, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return contData;
    case types.DECREMENT:
      return void draft.num + action.payload;
    case "decrement":
      return void draft.salary - action.payload;
  }
};
