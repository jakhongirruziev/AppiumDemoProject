import { RESET_STATE } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Action<T = any> = { type: string; payload: T };

export const resetAppState = () => ({
  type: RESET_STATE
});

export * from "./authActions";
export * from "./orderHistoryActions";
export * from "./menuActions";
