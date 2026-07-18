import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { themeType } from '@/interface';
import {
  fontFamily,
  fontSize,
  Ionicons,
  Feather,
} from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { AppBackground } from '@/components';
import Price from '@/components/common/Price';
import SimpleHeader from '@/components/headers/SimpleHeader';
import FixedBottomButton from '@/components/buttons/FixedBottomButton';
import CheckoutStepper from '@/components/common/CheckoutStepper';
import { useCartStore } from '@/store/cartStore';
import { useAddressStore } from '@/store/addressStore';
import { useAuthStore } from '@/store/authStore';
import { updateCartBuyerIdentity } from '@/api/services/cart.service';
import type { TMainStack } from '@/interface/navigation.type';

type PaymentScreenRouteProp = RouteProp<TMainStack, 'PaymentScreen'>;

export default function PaymentScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<PaymentScreenRouteProp>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  const { addressId, totalAmount, currency, isDirectBuy, directCartId, directCheckoutUrl } = route.params;

  const { cart, cartId, setCart } = useCartStore();
  const { addresses } = useAddressStore();
  const { user } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const selectedAddress = addresses.find(a => a.id === addressId);
  const items = isDirectBuy ? [] : (cart?.items || []);
  const subtotalAmount = isDirectBuy ? totalAmount : (cart?.subtotalAmount?.amount || totalAmount);
  const currencyCode = isDirectBuy ? currency : (cart?.subtotalAmount?.currencyCode || currency);
  const checkoutUrl = isDirectBuy ? (directCheckoutUrl || '') : (cart?.checkoutUrl || '');
  const activeCartId = isDirectBuy ? directCartId : cartId;

  // ─── Stepper ────────────────────────────────────────────────────────────────



  // ─── Order Summary ────────────────────────────────────────────────────────

  const renderOrderSummary = () => (
    <View
      style={[
        styles.summaryCard,
        { backgroundColor: themeColor.backgroundColorS1 },
      ]}
    >
      <Text style={[styles.sectionTitle, { color: themeColor.text }]}>
        {t('payment.order_summary')}
      </Text>

      {/* Cart Items */}
      {items.map(item => (
        <View key={item.lineId} style={styles.cartItem}>
          <View style={styles.cartItemLeft}>
            <Text
              style={[styles.cartItemTitle, { color: themeColor.text }]}
              numberOfLines={2}
            >
              {item.merchandise.productTitle}
            </Text>
            <Text
              style={[styles.cartItemVariant, { color: themeColor.textS1 }]}
            >
              {item.merchandise.variantTitle} · Qty: {item.quantity}
            </Text>
          </View>
          <Text style={[styles.cartItemPrice, { color: themeColor.text }]}>
            <Price
              price={item.totalAmount.amount}
              currency={item.totalAmount.currencyCode}
              size="small"
            />
          </Text>
        </View>
      ))}

      <View
        style={[styles.divider, { backgroundColor: themeColor.borderColor }]}
      />

      {/* Subtotal */}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: themeColor.textS1 }]}>
          {t('cart.subtotal')}
        </Text>
        <Text style={[styles.summaryValue, { color: themeColor.text }]}>
          <Price price={subtotalAmount} currency={currencyCode} size="small" />
        </Text>
      </View>

      {/* Shipping */}
      <View
        style={[
          styles.shippingContainer,
          { backgroundColor: themeColor.primary },
        ]}
      >
        <Text style={[styles.summaryLabel, { color: themeColor.textS1 }]}>
          {t('cart.shipping', 'Shipping')}
        </Text>
        <Feather name="info" size={20} color={themeColor.text} />
      </View>

      <View
        style={[styles.divider, { backgroundColor: themeColor.borderColor }]}
      />

      {/* Total */}
      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, { color: themeColor.text }]}>
          {t('cart.total')}
        </Text>
        <Text
          style={[styles.totalValue, { color: themeColor.buttonBackground }]}
        >
          <Price price={totalAmount} currency={currencyCode} size="medium" />
        </Text>
      </View>
    </View>
  );

  // ─── Shipping Address Card ────────────────────────────────────────────────

  const renderAddressCard = () => {
    if (!selectedAddress) return null;
    return (
      <View
        style={[
          styles.addressCard,
          { backgroundColor: themeColor.backgroundColorS1 },
        ]}
      >
        <View style={styles.addressCardHeader}>
          <Feather
            name="map-pin"
            size={16}
            color={themeColor.buttonBackground}
          />
          <Text style={[styles.addressCardTitle, { color: themeColor.text }]}>
            {t('payment.delivering_to')}
          </Text>
        </View>
        <Text style={[styles.addressName, { color: themeColor.text }]}>
          {selectedAddress.name}
        </Text>
        <Text style={[styles.addressText, { color: themeColor.textS1 }]}>
          {selectedAddress.address}
        </Text>
        <Text style={[styles.addressPhone, { color: themeColor.textS1 }]}>
          {selectedAddress.phone}
        </Text>
      </View>
    );
  };

  // ─── Shopify Checkout Handler ──────────────────────────────────────────────

  const handleProceedToCheckout = useCallback(async () => {
    if (!checkoutUrl) {
      Alert.alert(t('payment.payment_failed'), t('cart.cart_empty'), [
        { text: t('buttons.ok') },
      ]);
      return;
    }

    if (!activeCartId || !selectedAddress) {
      // Just navigate if we don't have enough data to pre-fill
      console.log('---->');

      navigation.navigate('ShopifyCheckoutScreen', {
        checkoutUrl,
        totalAmount: String(totalAmount),
        currency: currencyCode,
      });
      return;
    }

    setLoading(true);
    let finalCheckoutUrl = checkoutUrl;

    try {
      // Pre-fill the Shopify checkout with the selected address and email
      const email = selectedAddress.email || user?.email || undefined;
      const phone = selectedAddress.phone || undefined;

      const buyerIdentity: any = {};
      if (email) buyerIdentity.email = email;
      if (phone) buyerIdentity.phone = phone;

      // Add delivery address preferences so Shopify knows where to ship
      buyerIdentity.deliveryAddressPreferences = [
        {
          deliveryAddress: {
            address1: selectedAddress.addressLine1,
            address2: selectedAddress.addressLine2 || '',
            city: selectedAddress.city,
            province: selectedAddress.state,
            country: 'India', // You might want to make this dynamic later
            zip: selectedAddress.postalCode,
            firstName:
              selectedAddress.firstName ||
              selectedAddress.name?.split(' ')[0] ||
              '',
            lastName:
              selectedAddress.lastName ||
              selectedAddress.name?.split(' ').slice(1).join(' ') ||
              '',
            phone: selectedAddress.phone,
          },
        },
      ];

      const updatedCart = await updateCartBuyerIdentity(activeCartId, buyerIdentity);

      // Update global cart just in case, only if it's not a direct buy
      if (!isDirectBuy) {
        setCart(updatedCart);
      }

      if (updatedCart.checkoutUrl) {
        finalCheckoutUrl = updatedCart.checkoutUrl;
      }
    } catch (error) {
      console.error('[PaymentScreen] Failed to pre-fill checkout:', error);
      // We still proceed even if pre-fill fails, user can just type it manually
    } finally {
      setLoading(false);
    }

    // Navigate to the WebView checkout screen
    // Shopify handles all payment processing — no backend needed
    console.log('------->checkoutUrl', checkoutUrl);
    console.log('------>totalAmount', totalAmount);
    console.log('------>currencyCode', currencyCode);

    navigation.navigate('ShopifyCheckoutScreen', {
      checkoutUrl: finalCheckoutUrl,
      totalAmount: String(totalAmount),
      currency: currencyCode,
    });
  }, [
    checkoutUrl,
    activeCartId,
    selectedAddress,
    user,
    setCart,
    navigation,
    totalAmount,
    currencyCode,
    t,
    isDirectBuy,
  ]);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <AppBackground backgroundColor={themeColor.primary}>
      <SimpleHeader title="Stylo" />

      {loading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={themeColor.buttonBackground} />
          <Text style={[styles.loaderText, { color: themeColor.text }]}>
            {t('payment.processing')}
          </Text>
        </View>
      )}

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CheckoutStepper activeStep={2} />

        <View style={styles.titleContainer}>
          <Text style={[styles.mainTitle, { color: themeColor.text }]}>
            {t('payment.title')}
          </Text>
        </View>

        {renderAddressCard()}
        {renderOrderSummary()}

        {/* Secure payment note */}
        <View style={styles.secureRow}>
          <Ionicons
            name="shield-checkmark-outline"
            size={16}
            color={themeColor.buttonBackground}
          />
          <Text style={[styles.secureText, { color: themeColor.textS1 }]}>
            {t('payment.secure_payment')}
          </Text>
        </View>
      </ScrollView>

      <FixedBottomButton
        title={t('payment.proceed_to_payment')}
        icon="credit-card"
        onPress={handleProceedToCheckout}
        topContent={
          <View style={styles.bottomBarRow}>
            <Text
              style={[styles.totalAmountLabel, { color: themeColor.textS1 }]}
            >
              {t('cart.total_amount')}
            </Text>
            <Text
              style={[
                styles.totalAmountValue,
                { color: themeColor.buttonBackground },
              ]}
            >
              <Price
                price={totalAmount}
                currency={currencyCode}
                size="medium"
              />
            </Text>
          </View>
        }
      />
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('4%'),
    },


    loaderOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 999,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderText: {
      marginTop: hp('1%'),
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },


    titleContainer: {
      marginBottom: hp('2.5%'),
    },
    mainTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f22,
    },

    // Address Card
    addressCard: {
      borderRadius: wp('4%'),
      padding: wp('4%'),
      marginBottom: hp('2%'),
    },
    addressCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('2%'),
      marginBottom: hp('1%'),
    },
    addressCardTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
    },
    addressName: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
      marginBottom: hp('0.5%'),
    },
    addressText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f13,
      lineHeight: 18,
    },
    addressPhone: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f13,
      marginTop: hp('0.5%'),
    },

    // Order Summary
    summaryCard: {
      borderRadius: wp('4%'),
      padding: wp('4%'),
      marginBottom: hp('2%'),
    },
    sectionTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
      marginBottom: hp('2%'),
    },
    cartItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: hp('1.5%'),
    },
    cartItemLeft: {
      flex: 1,
      marginRight: wp('2%'),
    },
    cartItemTitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f13,
    },
    cartItemVariant: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f12,
      marginTop: 2,
    },
    cartItemPrice: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f13,
    },
    divider: {
      height: 1,
      marginVertical: hp('1.5%'),
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    shippingContainer: {
      marginTop: hp('1.5%'),
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp('3%'),
      borderRadius: wp('5%'),
      gap: wp('2%'),
    },
    summaryLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },
    summaryValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
    },
    totalLabel: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
    totalValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },

    // Secure note
    secureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: wp('2%'),
      marginTop: hp('1%'),
    },
    secureText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f12,
    },
    bottomBarRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalAmountLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
      textTransform: 'uppercase',
    },
    totalAmountValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f18,
    },
  });
