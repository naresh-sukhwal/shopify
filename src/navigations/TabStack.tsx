import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TBottomTabStack } from '@/interface/navigation.type';
import { AppBackground, CustomTabBar } from '@/components';
import HomeScreen from '@/screens/main/tab/HomeScreen';
import ProfileScreen from '@/screens/main/tab/ProfileScreen';
import SearchScreen from '@/screens/main/tab/SearchScreen';
import WishlistScreen from '@/screens/main/tab/WishlistScreen';
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
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
        <Tab.Screen name="WishlistScreen" component={WishlistScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </AppBackground>
  );
}
