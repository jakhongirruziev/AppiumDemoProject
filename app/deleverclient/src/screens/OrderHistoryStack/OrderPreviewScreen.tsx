import {
  EmptyScreen,
  FoodPanel,
  Panel,
  PanelDivider,
} from 'delever/lib/components';
import { OrderStatus } from 'delever/lib/constants';
import React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

import { Order } from '../../APIDataTypes';
import { CourierOrder } from '../../components/CourierOrder';
import { Colors, no_connection } from '../../constants';
import { calcOrderPrice, capitalize, displayMealName } from '../../helpers';
import L from '../../localization';

interface OrderPreviewScreenProps {
  navigation: NavigationScreenProp<NavigationState, Order>;
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#fff',
  },
  statusLabel: {
    backgroundColor: Colors.theme,
    padding: 10,
  },
  statusLabelText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export function OrderPreviewScreen(props: OrderPreviewScreenProps) {
  const {
    navigation: {
      state: { params: order },
    },
  } = props;

  if (!order) {
    return (
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListEmptyComponent={
          <EmptyScreen
            illustration={no_connection}
            text={L.errors.network_error}
          />
        }
      />
    );
  }

  return (
    <View style={styles.wrapper}>
      {order.status === OrderStatus.PICKED_UP && (
        <View style={styles.statusLabel}>
          <Text style={styles.statusLabelText}>Courier is going</Text>
        </View>
      )}
      <ScrollView>
        <CourierOrder {...order} hasBorder={false} />
        <PanelDivider label={L.menu_screen.title} />
        {order.meals &&
          order.meals.map((item, i) => (
            <FoodPanel
              key={i}
              style={styles.panel}
              title={displayMealName(
                item.name,
                item.count,
                item.size && item.size.name
              )}
              value={calcOrderPrice(item)}
              additions={
                item.additions && item.additions.map(addt => addt.name)
              }
            />
          ))}
        <PanelDivider label={L.details_screen.payment_details} />
        <Panel
          style={styles.panel}
          hasBorder={false}
          boldTitle={false}
          title={`${L.details_screen.payment_type}:`}
          value={capitalize(order.payment || 'unknown')}
        />
        <Panel
          style={styles.panel}
          hasBorder={false}
          boldTitle={false}
          title={`${L.common.Order}:`}
          value={`${order.meal_price} ${L.common.currency}`}
        />
        <Panel
          style={styles.panel}
          hasBorder={false}
          boldTitle={false}
          title={`${L.common.Delivery}:`}
          value={`${order.delivery_price} ${L.common.currency}`}
        />
        <Panel
          style={styles.panel}
          hasBorder={false}
          boldValue={true}
          textSize={18}
          title={`${L.details_screen.Overall}:`}
          value={`${order.delivery_price + order.meal_price} ${
            L.common.currency
          }`}
        />
      </ScrollView>
    </View>
  );
}
