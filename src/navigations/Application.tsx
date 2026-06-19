import React, { useEffect, useState } from 'react';
import { TRootStack } from '@/interface/navigation.type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  navigate,
  navigateAndSimpleReset,
  navigationRef,
  resetToNestedScreen,
} from '@/utils/navigation.utils';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {
  AppUpdateModal,
  AuthSheet,
  InternetModal,
  UnAutheriseModal,
} from '@/components';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import VersionCheck from 'react-native-version-check';
import LanguageScreen from '@/screens/language/LanguageScreen';
import LandingScreen from '@/screens/landing/LandingScreen';
import { getAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';

const RootNavigator = createNativeStackNavigator<TRootStack>();

export default function Application() {
  const [isUnAutharized, setIsUnAutharized] = useState(false);
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

  const onNavigationReady = async () => {
    try {
      const isLandingCompleted = await getAsyncStorage(
        ASYNC_KEYS.IS_LANDING_COMPLETED,
      );
      const isLanguageSelected = await getAsyncStorage(
        ASYNC_KEYS.IS_LANGAUGE_SELECTED,
      );
      const token = await getAsyncStorage(ASYNC_KEYS.ACCESS_TOKEN);
      const isKycCompleted = await getAsyncStorage(ASYNC_KEYS.IS_KYC_COMPLETED);
      console.log({
        onNavigationReady: {
          isLandingCompleted,
          isLanguageSelected,
          token,
          isKycCompleted,
        },
      });
      if (!isLandingCompleted) {
        navigate('LandingScreen');
      } else if (!isLanguageSelected) {
        navigate('LanguageScreen');
      } else if (!token) {
        navigateAndSimpleReset('AuthStack');
      } else {
        if (isKycCompleted) {
          navigateAndSimpleReset('MainStack');
        } else {
          resetToNestedScreen('MainStack', 'KycDetails');
        }
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <>
      <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
        <RootNavigator.Navigator screenOptions={{ headerShown: false }}>
          <RootNavigator.Screen
            component={LandingScreen}
            name="LandingScreen"
          />
          <RootNavigator.Screen component={AuthStack} name="AuthStack" />
          <RootNavigator.Screen component={MainStack} name="MainStack" />
        </RootNavigator.Navigator>
      </NavigationContainer>

      <AuthSheet />
      <InternetModal visible={!isConnected} onClose={() => { }} />
      <AppUpdateModal visible={showUpdateModal} onClose={() => { }} />
      <UnAutheriseModal visible={isUnAutharized} onClose={() => { }} />
    </>
  );
}
