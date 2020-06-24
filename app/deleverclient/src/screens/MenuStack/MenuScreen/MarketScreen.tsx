import { useNavigation } from '@react-navigation/native';
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

import { MenuMeal } from '../../../APIDataTypes';
import { host, no_connection, no_new_orders } from '../../../constants';
import { formatNumber } from '../../../helpers';
import L from '../../../localization';
import { useMenuData } from '../../../reduxStore/actions/actions';
import { marketScreenStyles } from './MenuScreenStyles';

type RenderItemParam = { item: [string, MenuMeal[]] };

export function MarketScreen() {
  const navigation = useNavigation();
  const {
    menuData,
    isLoadingMenuData,
    errorMenuData,
    refetchMenuData,
  } = useMenuData();

  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList<any>>(null);

  const categorizedData = useMemo(() => Object.entries(menuData.categorized), [
    menuData,
  ]);

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
    <View style={marketScreenStyles.container}>
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
            text={L.market_screen.no_items}
          />
        }
      />
    </View>
  );
}
