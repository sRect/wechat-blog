import { createContext } from "react";
import * as types from "./types";
import * as reducers from "./reducer";
import * as actions from "./action";
import * as states from "./states";

const Context = createContext({});

// 用creteContext构造简易版的redux
export { Context, types, reducers, actions, states };
