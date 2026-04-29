import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '@/store';
import { ContextProvider } from '@/context/ContextFile';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox, Appearance } from 'react-native';
import Application from '@/navigations/Application';
import { setSystemTheme } from '@/store/ThemeSlice';
import { StripeProvider } from '@stripe/stripe-react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { STRIPE_KEY } from '@/service/config';

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();

    const syncTheme = () => {
      const scheme = Appearance.getColorScheme();
      store.dispatch(setSystemTheme(scheme));
    };

    syncTheme(); // Sync on launch

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      store.dispatch(setSystemTheme(colorScheme));
    });

    return () => subscription.remove();
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StripeProvider publishableKey={STRIPE_KEY}>
            <ContextProvider>
              <ToastProvider>
                <MenuProvider>
                  <Application />
                </MenuProvider>
              </ToastProvider>
            </ContextProvider>
          </StripeProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
