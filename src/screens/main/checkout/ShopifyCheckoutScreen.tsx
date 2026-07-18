import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { WebView as RNWebView, WebViewNavigation } from 'react-native-webview';
import type { WebViewErrorEvent } from 'react-native-webview/lib/WebViewTypes';
const WebView = RNWebView as any;
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { useCartStore } from '@/store/cartStore';
import type { TMainStack } from '@/interface/navigation.type';
import { AppBackground } from '@/components';

type ShopifyCheckoutRouteProp = RouteProp<TMainStack, 'ShopifyCheckoutScreen'>;

// Shopify's thank-you / order-confirmation URL patterns
const SUCCESS_URL_PATTERNS = [
  '/thank_you',
  '/orders/',
  'thank-you',
  'order-confirmation',
];

export default function ShopifyCheckoutScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<ShopifyCheckoutRouteProp>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  const { checkoutUrl, totalAmount, currency } = route.params;

  const webViewRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { clearCart } = useCartStore();

  // ── Detect Shopify order success ─────────────────────────────────────────

  const handleNavigationChange = useCallback(
    (navState: WebViewNavigation) => {
      const url = navState.url || '';
      const isSuccess = SUCCESS_URL_PATTERNS.some(pattern =>
        url.toLowerCase().includes(pattern),
      );

      if (isSuccess) {
        // Extract order number from URL if present (e.g. /orders/12345)
        const orderMatch = url.match(/\/orders\/([^/?]+)/);
        const orderId = orderMatch ? orderMatch[1] : `shopify-${Date.now()}`;

        // Clear the cart since order is placed
        clearCart();

        // Navigate to success screen — replace so back doesn't return to checkout
        navigation.replace('OrderSuccessScreen', {
          orderId,
          totalAmount,
          currency,
        });
      }
    },
    [navigation, totalAmount, currency, clearCart],
  );

  // ── Error state ───────────────────────────────────────────────────────────

  if (error) {
    return (
      <View style={[styles.centered, { backgroundColor: themeColor.primary }]}>
        <Ionicons name="warning-outline" size={48} color={themeColor.textS1} />
        <Text style={[styles.errorTitle, { color: themeColor.text }]}>
          {t('payment.payment_failed')}
        </Text>
        <Text style={[styles.errorDesc, { color: themeColor.textS1 }]}>
          {error}
        </Text>
        <TouchableOpacity
          style={[
            styles.retryButton,
            { backgroundColor: themeColor.buttonBackground },
          ]}
          onPress={() => {
            setError(null);
            webViewRef.current?.reload();
          }}
          accessibilityLabel={t('buttons.retry')}
        >
          <Text style={[styles.retryText, { color: themeColor.white }]}>
            {t('buttons.retry')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <AppBackground backgroundColor={themeColor.backgroundColorS1}>
      <View style={[styles.container, { backgroundColor: themeColor.primary }]}>
        <StatusBar
          barStyle={
            themeColor.primary === '#000' ? 'light-content' : 'dark-content'
          }
          backgroundColor={themeColor.primary}
        />

        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: themeColor.backgroundColorS1,
              borderBottomColor: themeColor.borderColor,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel={t('buttons.back')}
          >
            <Ionicons name="arrow-back" size={22} color={themeColor.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: themeColor.text }]}>
            {t('payment.title')}
          </Text>
          {/* Secure badge */}
          <View style={styles.secureBadge}>
            <Ionicons
              name="lock-closed"
              size={14}
              color={themeColor.buttonBackground}
            />
            <Text
              style={[
                styles.secureText,
                { color: themeColor.buttonBackground },
              ]}
            >
              {t('payment.secure_payment')}
            </Text>
          </View>
        </View>

        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{ uri: checkoutUrl }}
          style={styles.webView}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={handleNavigationChange}
          onError={(syntheticEvent: WebViewErrorEvent) => {
            const { nativeEvent } = syntheticEvent;
            setLoading(false);
            setError(
              nativeEvent.description || t('payment.payment_failed_desc'),
            );
          }}
          // Allow Shopify payment providers (Stripe, PayU, etc.)
          mixedContentMode="compatibility"
          javaScriptEnabled
          domStorageEnabled
          thirdPartyCookiesEnabled
          sharedCookiesEnabled
        />

        {/* Loading overlay */}
        {loading && (
          <View
            style={[
              styles.loaderOverlay,
              { backgroundColor: themeColor.primary },
            ]}
          >
            <ActivityIndicator
              size="large"
              color={themeColor.buttonBackground}
            />
            <Text style={[styles.loaderText, { color: themeColor.textS1 }]}>
              {t('payment.processing')}
            </Text>
          </View>
        )}
      </View>
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: wp('8%'),
      gap: hp('2%'),
    },

    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1.5%'),
      borderBottomWidth: 1,
    },
    backButton: {
      padding: wp('1%'),
      marginRight: wp('3%'),
    },
    headerTitle: {
      flex: 1,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
    },
    secureBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('1%'),
    },
    secureText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f11,
    },

    // WebView
    webView: {
      flex: 1,
    },

    // Loader
    loaderOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      gap: hp('2%'),
    },
    loaderText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },

    // Error
    errorTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f18,
      textAlign: 'center',
      marginTop: hp('1%'),
    },
    errorDesc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      textAlign: 'center',
    },
    retryButton: {
      marginTop: hp('1%'),
      paddingHorizontal: wp('8%'),
      paddingVertical: hp('1.5%'),
      borderRadius: wp('3%'),
    },
    retryText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f15,
    },
  });
