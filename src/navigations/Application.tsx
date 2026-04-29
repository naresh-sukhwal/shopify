import React, { useEffect, useRef, useState } from 'react';
import { TRootStack } from '@/interface/navigation.type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@/utils/navigation.utils';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {
  AppUpdateModal,
  AuthSheet,
  InternetModal,
  UnAutheriseModal,
} from '@/components';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import VersionCheck from 'react-native-version-check';

const RootNavigator = createNativeStackNavigator<TRootStack>();

export default function Application() {
  const { isUnAutharized } = useSelector(
    (state: RootState) => state.GeneralManager,
  );
  const [isConnected, setIsConnected] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchVersions();
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchVersions = async () => {
    VersionCheck.needUpdate({
      depth: 2,
    }).then(res => {
      console.log('res', res);
      // setShowUpdateModal(res.isNeeded);
    });
  };

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator.Navigator screenOptions={{ headerShown: false }}>
          <RootNavigator.Screen component={AuthStack} name="AuthStack" />
          <RootNavigator.Screen component={MainStack} name="MainStack" />
        </RootNavigator.Navigator>
      </NavigationContainer>

      <AuthSheet />
      <InternetModal visible={!isConnected} onClose={() => {}} />
      <AppUpdateModal visible={showUpdateModal} onClose={() => {}} />
      <UnAutheriseModal visible={isUnAutharized} onClose={() => {}} />
    </>
  );
}
