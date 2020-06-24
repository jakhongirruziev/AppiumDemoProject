import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { AppState } from '../reduxStore/reducers/rootReducer';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { SignUpScreen } from '../screens/LoginScreen/SignUpScreen';
import { MainTabNavigator } from './MainTabNavigator';
const styles = StyleSheet.create({  
  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
function AuthLoadingScreen() {
  const { navigate } = useNavigation();
  const { token } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    navigate(token ? 'Main' : 'Login');
  }, [navigate, token]);

  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const RootStack = createStackNavigator();
export function RootStackNavigation() {
  return (
    <RootStack.Navigator initialRouteName="AuthLoading">
      <RootStack.Screen
        name="AuthLoading"
        component={AuthLoadingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="Main"
        options={{ header: () => null }}
        component={MainTabNavigator}
      />
    </RootStack.Navigator>
  );
}
