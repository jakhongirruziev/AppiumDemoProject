import { combineReducers } from "redux";
import { purgeStoredState } from "redux-persist";

import { NewOrder } from "../../APIDataTypes";
import { RESET_STATE } from "../actions/types";
import { persistConfig } from "../config";
import { authReducer, AuthReducerState } from "./authReducer";
import { menuReducer, MenuReducerState } from "./menuReducer";
import { newOrderReducer } from "./newOrderReducer";
import {
  orderHistoryReducer,
  OrderHistoryReducerState
} from "./orderHistoryReducer";

export type AppState = {
  auth: AuthReducerState;
  menu: MenuReducerState;
  orderHistory: OrderHistoryReducerState;
  newOrder: NewOrder;
};

// Add here your reducers
const appReducer = combineReducers({
  auth: authReducer,
  menu: menuReducer,
  newOrder: newOrderReducer,
  orderHistory: orderHistoryReducer
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootReducer = (state?: AppState, action?: any) => {
  if (action && action.type === RESET_STATE) {
    purgeStoredState(persistConfig);
  }
  return appReducer(state, action);
};
