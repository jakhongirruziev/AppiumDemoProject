import { useNavigation, useNavigationState } from '@react-navigation/native';
import {
  EmptyScreen,
  Loading,
  MenuItem,
  PanelDivider,
  RefreshableEmptyScreen,
} from 'delever/lib/components';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import { useSelector } from 'react-redux';

import { MenuMeal } from '../../../APIDataTypes';
import { host, no_connection, no_new_orders } from '../../../constants';
import { formatNumber } from '../../../helpers';
import L from '../../../localization';
import { useMenuData } from '../../../reduxStore/actions/actions';
import { AppState } from '../../../reduxStore/reducers/rootReducer';
import { menuScreenStyles } from './MenuScreenStyles';
import { IssueOrderButton } from './Widgets/IssueOrderButton';
import { MenuNavigator } from './Widgets/MenuNavigatorWidget';

type RenderItemParam = { item: [string, MenuMeal[]] };

export function MenuScreen() {
  const navigation = useNavigation();
  const routeIndex = useNavigationState(state => state.index);
  const {
    menuData,
    isLoadingMenuData,
    errorMenuData,
    refetchMenuData,
  } = useMenuData();

  const newOrder = useSelector((state: AppState) => state.newOrder);
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  const categorizedData = useMemo(() => Object.entries(menuData.categorized), [
    menuData,
  ]);

  const totalOrderPrice = useMemo(
    () => newOrder.meals.reduce((acc, meal) => acc + meal.totalPrice, 0),
    [newOrder]
  );

  const toggleSelectedCategory = (categoryIndex: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: categoryIndex,
      });
    }
  };

  const refresh = () => {
    setRefreshing(true);
    SimpleToast.show(L.common.syncing);
    refetchMenuData().finally(() => {
      setRefreshing(false);
    });
  };

  const renderItem = ({ item: [key, categoryItems] }: RenderItemParam) => (
    <>
      <PanelDivider label={key} />
      {categoryItems.map(meal => (
        <MenuItem
          name={meal.name}
          price={`${formatNumber(meal.price)} sums`}
          image={host + meal.image}
          key={meal.id}
          onPress={() => navigation.navigate('MealPreview', { meal })}
        />
      ))}
    </>
  );

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    if (parent) {
      parent.setOptions({ tabBarVisible: !(routeIndex > 0) });
    }
  }, [navigation, routeIndex]);

  useEffect(() => {
    SimpleToast.show(L.common.syncing);
    refetchMenuData().finally(() => {
      setRefreshing(false);
    });
  }, [refetchMenuData]);

  if (isLoadingMenuData && !refreshing && !categorizedData.length) {
    return <Loading size={60} />;
  }

  if (errorMenuData) {
    return (
      <RefreshableEmptyScreen
        refreshing={refreshing}
        onRefresh={refresh}
        illustration={no_connection}
        text={L.errors.network_error}
      />
    );
  }

  return (
    <View style={menuScreenStyles.container}>
      <FlatList
        ref={flatListRef}
        data={categorizedData}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={refresh}
        keyExtractor={item => item[0]}
        ListEmptyComponent={
          <EmptyScreen
            illustration={no_new_orders}
            text={L.menu_screen.no_items}
          />
        }
      />
      {newOrder.meals.length > 0 && (
        <IssueOrderButton
          onPress={() => navigation.navigate('AddOrder', { address: ''})}
          orderMealsCount={newOrder.meals.length}
          totalOrderPrice={totalOrderPrice}
        />
      )}
      <MenuNavigator
        categorizedData={categorizedData}
        onPressOption={toggleSelectedCategory}
        isRaised={newOrder.meals.length > 0}
      />
    </View>
  );
}
