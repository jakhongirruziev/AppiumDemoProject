import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { SignUpScreen } from '../screens/LoginScreen/SignUpScreen';

const AuthStack = createStackNavigator();
export function AuthStackNavigation() {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}
