import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TMainStack } from '@/interface/navigation.type';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { onMessageReceived } from '@/utils/notification.utils';
import { handleNavigation } from '@/utils/helper.utils';
import DrawerStack from './DrawerStack';
import { useState } from 'react';
import { COMMON_KEYS } from '@/utils/contant.utils';
import TabStack from './TabStack';
import KycDetails from '@/screens/main/kyc/KycDetails';

const MainNavigator = createNativeStackNavigator<TMainStack>();

export default function MainStack() {
  // Test State for Modals
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [endSessionModalVisible, setEndSessionModalVisible] = useState(false);

  const notification = async () => {
    const initialNotification: any = await notifee.getInitialNotification();
    console.log('initialNotification ---->', initialNotification);

    if (initialNotification?.pressAction?.id == COMMON_KEYS.PRESS_ID) {
      const rawDataObj = initialNotification?.notification?.data?.dataObj;
      const parsedDataObj =
        typeof rawDataObj === 'string' ? JSON.parse(rawDataObj) : rawDataObj;
      handleNavigation(parsedDataObj);
    }
  };

  // useEffect(() => {
  //   return notifee.onForegroundEvent(
  //     async ({ type, detail }: { type: any; detail: any }) => {
  //       switch (type) {
  //         case EventType.DISMISSED:
  //           break;
  //         case EventType.PRESS:
  //           if (detail?.pressAction?.id == COMMON_KEYS.PRESS_ID) {
  //             const rawDataObj = detail?.notification?.data?.dataObj;
  //             const parsedDataObj =
  //               typeof rawDataObj === 'string'
  //                 ? JSON.parse(rawDataObj)
  //                 : rawDataObj;
  //             handleNavigation(parsedDataObj);
  //           }
  //           break;
  //       }
  //     },
  //   );
  // }, []);

  // useEffect(() => {
  //   // getConfig();
  //   // requestLocationPermissions();
  //   notification();
  //   let lastNotificationId: any = null;

  //   // Function to handle notifications
  //   const handleNotification = async (res: any) => {
  //     const notificationId = res?.messageId;

  //     console.log('On message recieved--->', res);

  //     // Process notification only if it's different from the last one received
  //     if (notificationId && notificationId !== lastNotificationId) {
  //       lastNotificationId = notificationId;
  //       const type = res?.data?.type as ENotificationType;
  //       if (BLOCKED_NOTIFICATION_TYPES.has(type)) {
  //         return;
  //       }
  //       // Update the last notification ID
  //       onMessageReceived(res);
  //     }
  //   };

  //   const unsubscribeMessage = messaging().onMessage(handleNotification);

  //   return () => {
  //     unsubscribeMessage();
  //   };
  // }, []);

  return (
    <MainNavigator.Navigator screenOptions={{ headerShown: false }}>
      <MainNavigator.Screen name="TabStack" component={TabStack} />
      <MainNavigator.Screen name="KycDetails" component={KycDetails} />
    </MainNavigator.Navigator>
  );
}
