import AsyncStorage from "@react-native-community/async-storage";

export const persistConfig = {
  key: "client_root",
  storage: AsyncStorage,
  timeout: 20000,
  whitelist: ["auth", "orderHistory"] // TODO: fix it after MVP
};
