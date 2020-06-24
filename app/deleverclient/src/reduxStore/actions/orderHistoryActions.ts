import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ordersURL } from "../../constants";
import { AppState } from "../reducers/rootReducer";
import { SET_ORDER_HISTORY } from "./types";

type UseOrderHistoryState = {
  isLoading?: boolean;
  error?: Error;
};

type Props = { skip: boolean };

export const useOrdersHistory = (config?: Props) => {
  const dispatch = useDispatch();
  const { orders, token } = useSelector((state: AppState) => ({
    orders: state.orderHistory.orders,
    token: state.auth.token
  }));
  const [state, setState] = useState<UseOrderHistoryState>({
    isLoading: true
  });

  const fetchOrders = useCallback(() => {
    setState({ isLoading: true });

    const request = axios.get(ordersURL, {
      headers: {
        Authorization: `Token ${token}`
      }
    });

    request
      .then(({ data }) => {
        setState({ isLoading: false });

        dispatch({
          payload: data.results,
          type: SET_ORDER_HISTORY
        });
      })
      .catch(reason => {
        setState({ error: reason, isLoading: false });
      });
    return request;
  }, [dispatch, token]);

  useEffect(() => {
    if (config && config.skip) {
      return;
    }
    fetchOrders();
  }, [config, fetchOrders]);

  return { orders, ...state, refetch: fetchOrders };
};
