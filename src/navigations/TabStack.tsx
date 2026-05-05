import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TBottomTabStack } from '@/interface/navigation.type';
import { AppBackground, CustomTabBar, SafeAreaWrapper } from '@/components';
import HomeScreen from '@/screens/main/tab/HomeScreen';
import ProfileScreen from '@/screens/main/tab/ProfileScreen';
import InvestScreen from '@/screens/main/tab/InvestScreen';
import WalletScreen from '@/screens/main/tab/WalletScreen';
import RewardScreen from '@/screens/main/tab/RewardScreen';
const Tab = createBottomTabNavigator<TBottomTabStack>();

export default function TabStack() {
  return (
    <AppBackground>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none',
            shadowColor: 'transparent',
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            paddingVertical: 5,
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="InvestScreen" component={InvestScreen} />
        <Tab.Screen name="WalletScreen" component={WalletScreen} />
        <Tab.Screen name="RewardScreen" component={RewardScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </AppBackground>
  );
}
