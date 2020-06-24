import { Order } from "../../APIDataTypes";
import { Action } from "../actions/actions";
import {
  ADD_ORDER_TO_HISTORY,
  RESET_STATE,
  SET_ORDER_HISTORY
} from "../actions/types";

export interface OrderHistoryReducerState {
  orders: Order[];
}

const ORDER_HISTORY_INITIAL_STATE: OrderHistoryReducerState = {
  orders: []
};

export const orderHistoryReducer = (
  state = ORDER_HISTORY_INITIAL_STATE,
  action: Action
): OrderHistoryReducerState => {
  switch (action.type) {
    case SET_ORDER_HISTORY:
      return {
        orders: action.payload
      };

    case ADD_ORDER_TO_HISTORY: {
      const orders = [action.payload, ...state.orders];
      return {
        orders
      };
    }

    case RESET_STATE:
      return ORDER_HISTORY_INITIAL_STATE;

    default:
      return state;
  }
};
