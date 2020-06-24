import { AxiosError } from "axios";
import numeral from "numeral";
import { Linking, Platform } from "react-native";

import { DataWithID, MenuMeal, OrderMeal } from "./APIDataTypes";
import L from "./localization";

// TODO: need to discuss
export const DELIVERY_PRICE = 5000;

export const HHMM = (HHMMSS: string) => HHMMSS.slice(0, 5);

export const isInPeriod = (HHMMSS1: string, HHMMSS2: string) => {
  const now = new Date();
  const nn = now.getMinutes() + now.getHours() * 60;
  const opens = HHMMSS1.split(":");
  const closes = HHMMSS2.split(":");
  const st = nn - +opens[1] - +opens[0] * 60;
  const en = nn - +closes[1] - +closes[0] * 60;
  return st * en < 0;
};

export const YYYYMMDD = (date: Date) => date.toISOString().split("T")[0];

export const sortOrdersByDate = (dateKey: string) => (row1: any, row2: any) =>{
  // console.log(row1[dateKey])
  return   +new Date(row2[dateKey]) - +new Date(row1[dateKey])}

export const ID_PREFIX = "_";

export const arrayToObject = <T extends DataWithID>(
  array: T[],
  sortKey?: string
) => {
  if (sortKey) {
    array.sort(sortOrdersByDate(sortKey));
  }
  const object: Record<string, T> = {};
  for (const item of array) {
    object[ID_PREFIX + item.id] = item;
  }
  return object;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortObjectFieldsBy = (key: string, object: any) => {
  const sorted = Object.values(object).sort(sortOrdersByDate(key));
  return arrayToObject(sorted as DataWithID[]);
};

export const minutesLeft = (time: string | null, direction = 1) =>
  time
    ? Math.floor(
        (Math.sign(direction) * (+new Date(time) - +new Date())) / 60000
      )
    : -1;

export const getDayMonth = (time: string | null) => {
  if (!time) {
    return "";
  }
  const date = new Date(time); // TODO: Make it localization flexible (for month)
  return date.getDate() + " " + date.toDateString().split(" ")[1];
};

export const orderStatusTime = (time: string | null) => {
  if (time) {
    const date = new Date(time);
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return date.toTimeString().slice(0, 5);
    }
    return date.getDate() + " " + date.toDateString().split(" ")[1];
  }
  return "";
};

export const getDayMonthTime = (time: string) => {
  const date = new Date(time); // TODO: Make it localization flexible (for month)
  return (
    date.getDate() +
    " " +
    date.toDateString().split(" ")[1] +
    ", " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
};

export const capitalize = (word: string) => {
  return typeof word === "string" && word.length
    ? word[0].toUpperCase() + word.slice(1)
    : "";
};

export const calcOrderPrice = (item: OrderMeal) => {
  const additions =
    item.additions && item.additions.length > 0
      ? item.additions.reduce((prev, current) => prev + current.extra_price, 0)
      : 0;
  return (
    (item.price + ((item.size && item.size.extra_price) || 0) + additions) *
    item.count
  );
};

export const errorText = (error: AxiosError) => {
  if (!error.response) {
    return "Error";
  }
  switch (error.response.status) {
    case 404:
      return L.common.error + ": " + L.errors.went_wrong;

    case 401:
      return L.common.error + ": " + L.login_screen.not_auth;

    case 500:
      return L.common.error + ": " + L.errors.server_error;

    default:
      return L.common.error + ": " + error.message;
  }
};

export const callNumber = (number: string) =>
  Linking.openURL((Platform.OS === "android" ? "tel:" : "telprompt:") + number);

export const categorizeMenu = (menu: MenuMeal[]) => {
  const categorized: Record<string, MenuMeal[]> = {};
  for (const item of menu) {
    if (!categorized.hasOwnProperty(item.category.name)) {
      categorized[item.category.name] = [];
    }
    categorized[item.category.name].push(item);
  }
  return categorized;
};

export const filterMenu = (data: MenuMeal[], searched: string) => {
  return categorizeMenu(
    data.filter(item =>
      item.name.toLowerCase().includes(searched.toLowerCase())
    )
  );
};

export const formatNumber = (number: number) => numeral(number).format("0,0");

export const displayMealName = (
  name: string,
  count: number,
  sizeName?: string | null
) => `${name}${(sizeName && " - " + sizeName) || ""} (${count})`;

export const noOperation = () => {};
