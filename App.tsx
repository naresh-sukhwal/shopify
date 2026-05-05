import React, { useEffect } from 'react';
import { ContextProvider } from '@/context/ContextFile';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox, Appearance } from 'react-native';
import Application from '@/navigations/Application';
import { StripeProvider } from '@stripe/stripe-react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { useThemeStore } from '@/store/themeStore';

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();

    const syncTheme = () => {
      const scheme = Appearance.getColorScheme();
      useThemeStore.getState().setSystemTheme('light');
    };

    syncTheme(); // Sync on launch

    // const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    //    useThemeStore.getState().setSystemTheme('light')
    // });

    // return () => subscription.remove();
  }, []);
  return (
    <SafeAreaProvider>
      <ContextProvider>
        <ToastProvider>
          <MenuProvider>
            <Application />
          </MenuProvider>
        </ToastProvider>
      </ContextProvider>
    </SafeAreaProvider>
  );
}
