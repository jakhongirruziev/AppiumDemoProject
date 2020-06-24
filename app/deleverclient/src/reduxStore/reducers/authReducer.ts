import { Action } from '../actions/actions';
import { REMOVE_TOKEN, RESET_STATE, SAVE_TOKEN } from '../actions/types';

const INITIAL_AUTH_STATE = {
  token: '',
};

export type AuthReducerState = typeof INITIAL_AUTH_STATE;

export const authReducer = (
  state = INITIAL_AUTH_STATE,
  action: Action
): AuthReducerState => {
  switch (action.type) {
    case SAVE_TOKEN:
      return { token: action.payload };

    case REMOVE_TOKEN:
      return { token: action.payload };

    case RESET_STATE:
      return INITIAL_AUTH_STATE;

    default:
      return state;
  }
};
