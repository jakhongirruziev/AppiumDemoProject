import { NewOrder } from "../../APIDataTypes";
import { Action } from "../actions/actions";
import {
  RESET_NEW_ORDER_STATE,
  RESET_STATE,
  SET_NEW_ORDER_MEAL,
  UPDATE_NEW_ORDER_MEAL
} from "../actions/types";

const MENU_INITIAL_STATE: NewOrder = {
  meals: []
};

export const newOrderReducer = (
  state = MENU_INITIAL_STATE,
  action: Action
): NewOrder => {
  switch (action.type) {
    case SET_NEW_ORDER_MEAL:
      return {
        ...state,
        meals: [...state.meals, action.payload]
      };

    case UPDATE_NEW_ORDER_MEAL: {
      state.meals.splice(action.payload.index, 1, action.payload.newOrderMeal);
      return {
        ...state,
        meals: [...state.meals]
      };
    }

    case RESET_NEW_ORDER_STATE:
      return MENU_INITIAL_STATE;

    case RESET_STATE:
      return MENU_INITIAL_STATE;

    default:
      return state;
  }
};
