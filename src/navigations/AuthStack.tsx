import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Signup from '../screens/auth/Signup';
import OtpVerification from '../screens/auth/OtpVerification';
import { TAuthStack } from '@/interface/navigation.type';

const AuthNavigator = createNativeStackNavigator<TAuthStack>();

export default function AuthStack() {
  return (
    <AuthNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthNavigator.Screen component={Login} name="Login" />
      <AuthNavigator.Screen component={Signup} name="Signup" />
      <AuthNavigator.Screen
        component={OtpVerification}
        name="OtpVerification"
      />
    </AuthNavigator.Navigator>
  );
}
