import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MenuMeal } from '../../APIDataTypes';
import { vendorMenuURL } from '../../constants';
import { categorizeMenu } from '../../helpers';
import { AppState } from '../reducers/rootReducer';
import { SET_MENU_DATA } from './types';

type UseMenuDataState = {
  isLoadingMenuData?: boolean;
  errorMenuData?: Error;
};

export const useMenuData = () => {
  const dispatch = useDispatch();
  const { menuData, token } = useSelector(({ auth, menu }: AppState) => ({
    menuData: menu.data,
    token: auth.token,
  }));

  const [state, setState] = useState<UseMenuDataState>({
    isLoadingMenuData: true,
  });

  const fetchMenuData = useCallback(() => {
    setState({ isLoadingMenuData: true });

    const request = axios.get<MenuMeal[]>(vendorMenuURL, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    request
      .then(response => {
        dispatch({
          payload: {
            actual: response.data,
            categorized: categorizeMenu(response.data),
          },
          type: SET_MENU_DATA,
        });
        return response;
      })
      .catch(error => {
        setState({ errorMenuData: error, isLoadingMenuData: false });

        return error;
      });

    return request;
  }, [dispatch, token]);

  useEffect(() => {
    fetchMenuData();
  }, [fetchMenuData]);

  return { menuData, ...state, refetchMenuData: fetchMenuData };
};
