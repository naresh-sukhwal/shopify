import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TBottomTabStack } from '@/interface/navigation.type';
import { CustomTabBar, SafeAreaWrapper } from '@/components';
import HomeScreen from '@/screens/main/tab/HomeScreen';
import ProfileScreen from '@/screens/main/tab/ProfileScreen';
import SearchScreen from '@/screens/main/tab/SearchScreen';
import StoreScreen from '@/screens/main/tab/StoreScreen';
import LibraryScreen from '@/screens/main/tab/LibraryScreen';
const Tab = createBottomTabNavigator<TBottomTabStack>();

export default function TabStack() {
  return (
    <SafeAreaWrapper useSafeArea={false}>
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
        <Tab.Screen name="LibraryScreen" component={LibraryScreen} />
        <Tab.Screen name="StoreScreen" component={StoreScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaWrapper>
  );
}
