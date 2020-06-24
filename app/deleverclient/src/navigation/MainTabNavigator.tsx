import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { MenuMeal, OrderMeal } from '../APIDataTypes';
import { ProfileButton } from '../components/ProfileButton';
import { Colors } from '../constants';
import L from '../localization';
import { AddOrderScreen } from '../screens/MenuStack/AddOrderScreen/AddOrderScreen';
import { ShowAddressOnMapScreen } from '../screens/MenuStack/AddOrderScreen/ShowAddressOnMapScreen';
import { MealPreviewScreen } from '../screens/MenuStack/MealPreviewScreen/MealPreviewScreen';
import { MarketScreen } from '../screens/MenuStack/MenuScreen/MarketScreen';
import { MenuScreen } from '../screens/MenuStack/MenuScreen/MenuScreen';
import { OrderHistoryScreen } from '../screens/OrderHistoryStack/OrderHistoryScreen';
import { OrderPreviewScreen } from '../screens/OrderHistoryStack/OrderPreviewScreen';

export type MenuStackParamList = {
  MealPreview: { meal: MenuMeal; orderMeal?: OrderMeal };
};

const MenuStack = createStackNavigator();
function MenuStackNavigator() {
  return (
    <MenuStack.Navigator initialRouteName="Menu">
      <MenuStack.Screen
        name="Market"
        component={MarketScreen}
        options={props => ({
          title: L.market_screen.title,
          headerRight: () => <ProfileButton navigation={props.navigation} />,
        })}
      />
      <MenuStack.Screen
        name="Menu"
        component={MenuScreen}
        options={props => ({
          title: L.menu_screen.title,
          headerRight: () => <ProfileButton navigation={props.navigation} />,
        })}
      />
      <MenuStack.Screen
        name="MealPreview"
        component={MealPreviewScreen}
        options={{ title: 'Preview' }}
      />
      <MenuStack.Screen
        name="AddOrder"
        component={AddOrderScreen}
        options={{ title: 'Add Order' }}
      />
      <MenuStack.Screen
        name="ShowAddressOnMap"
        component={ShowAddressOnMapScreen}
        options={{ title: 'Delivery Address' }}
      />
    </MenuStack.Navigator>
  );
}

const OrderHistoryStack = createStackNavigator();
function OrderHistoryStackNavigator() {
  return (
    <OrderHistoryStack.Navigator initialRouteName="OrderHistory">
      <OrderHistoryStack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={({ navigation }) => ({
          title: L.order_history.title,
          headerRight: () => (
            <ProfileButton
              onPress={() => console.log(1)}
              navigation={navigation}
            />
          ),
        })}
      />
      <OrderHistoryStack.Screen
        name="OrderPreview"
        component={OrderPreviewScreen}
        // options={({ navigation: { state } }) => ({
        //   title: `${L.common.Order} #${state.params?.number}`,
        // })}
      />
    </OrderHistoryStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MenuStack"
      tabBarOptions={{
        activeTintColor: Colors.theme,
        inactiveTintColor: Colors.darkGrey,
        labelStyle: {
          fontSize: 14,
          fontWeight: '500',
        },
        style: {
          borderTopColor: '#fff0',
          elevation: 20,
          height: 100,
          paddingVertical: 2,
        },
      }}
    >
      <Tab.Screen
        name="MenuStack"
        component={MenuStackNavigator}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color }) => (
            <Icon name="import-contacts" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OrderHistoryStack"
        component={OrderHistoryStackNavigator}
        options={{
          tabBarLabel: 'Order History',
          tabBarIcon: ({ color }) => (
            <Icon name="work" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
