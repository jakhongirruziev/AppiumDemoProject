import { MenuMeal } from "../../APIDataTypes";
import { Action } from "../actions/actions";
import {
  DELETE_MENU_ITEM,
  RESET_STATE,
  SET_MENU_DATA,
  UPDATE_MENU_ITEM
} from "../actions/types";

export interface MenuReducerState {
  data: {
    categorized: Record<string, MenuMeal[]>;
    actual: MenuMeal[];
  };
  fetching: boolean;
  error: string;
  searching: boolean;
}

const MENU_INITIAL_STATE: MenuReducerState = {
  data: {
    actual: [],
    categorized: {}
  },
  error: "",
  fetching: true,
  searching: false
};

export const menuReducer = (
  state = MENU_INITIAL_STATE,
  action: Action
): MenuReducerState => {
  switch (action.type) {
    case SET_MENU_DATA:
      return {
        data: action.payload,
        error: "",
        fetching: false,
        searching: false
      };

    case UPDATE_MENU_ITEM:
      return state;

    case DELETE_MENU_ITEM:
      return state;

    case RESET_STATE:
      return MENU_INITIAL_STATE;

    default:
      return state;
  }
};
