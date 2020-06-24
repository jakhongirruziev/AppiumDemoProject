import { applyMiddleware, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk, { ThunkMiddleware } from "redux-thunk";

import { persistConfig } from "./config";
import { rootReducer } from "./reducers/rootReducer";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk as ThunkMiddleware)
);
export const persistor = persistStore(store);
