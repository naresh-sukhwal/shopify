import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { themeType } from '@/interface';
import { fontFamily, fontSize, Ionicons, Feather } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { AppBackground } from '@/components';
import Price from '@/components/common/Price';
import { useCartStore } from '@/store/cartStore';
import type { TMainStack } from '@/interface/navigation.type';

type OrderSuccessScreenRouteProp = RouteProp<TMainStack, 'OrderSuccessScreen'>;

export default function OrderSuccessScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<OrderSuccessScreenRouteProp>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  const { orderId, totalAmount, currency } = route.params;

  const { clearCart, cart } = useCartStore();

  // Animation refs
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;

  const items = cart?.items || [];

  useEffect(() => {
    // Clear cart on success
    clearCart();

    // Animate in
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabStack' }],
    });
  };

  return (
    <AppBackground backgroundColor={themeColor.primary}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <Animated.View
          style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}
        >
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: themeColor.buttonBackground },
            ]}
          >
            <Ionicons name="checkmark" size={60} color={themeColor.white} />
          </View>
        </Animated.View>

        {/* Title & Subtitle */}
        <Animated.View
          style={[
            styles.titleContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={[styles.successTitle, { color: themeColor.text }]}>
            {t('order.success_title')}
          </Text>
          <Text style={[styles.successSubtitle, { color: themeColor.textS1 }]}>
            {t('order.success_subtitle')}
          </Text>
        </Animated.View>

        {/* Order Details Card */}
        <Animated.View
          style={[
            styles.detailsCard,
            { backgroundColor: themeColor.backgroundColorS1, opacity: fadeAnim },
          ]}
        >
          {/* Order ID */}
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: themeColor.textS1 }]}>
              {t('order.order_id')}
            </Text>
            <Text
              style={[styles.detailValue, { color: themeColor.text }]}
              numberOfLines={1}
            >
              #{orderId.length > 20 ? orderId.slice(-12) : orderId}
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: themeColor.borderColor }]} />

          {/* Total Amount */}
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: themeColor.textS1 }]}>
              {t('cart.total')}
            </Text>
            <Text style={[styles.detailValueBold, { color: themeColor.buttonBackground }]}>
              <Price price={totalAmount} currency={currency} size="medium" />
            </Text>
          </View>

          {/* Items count */}
          {items.length > 0 && (
            <>
              <View style={[styles.divider, { backgroundColor: themeColor.borderColor }]} />
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: themeColor.textS1 }]}>
                  {t('cart.items')}
                </Text>
                <Text style={[styles.detailValue, { color: themeColor.text }]}>
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </Text>
              </View>
            </>
          )}

          <View style={[styles.divider, { backgroundColor: themeColor.borderColor }]} />

          {/* Status */}
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: themeColor.textS1 }]}>
              {t('order.status')}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: themeColor.buttonBackground + '20' }]}>
              <Text style={[styles.statusText, { color: themeColor.buttonBackground }]}>
                {t('order.confirmed')}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Delivery note */}
        <Animated.View
          style={[styles.deliveryNote, { opacity: fadeAnim }]}
        >
          <Feather name="package" size={18} color={themeColor.buttonBackground} />
          <Text style={[styles.deliveryNoteText, { color: themeColor.textS1 }]}>
            {t('order.delivery_note')}
          </Text>
        </Animated.View>

        {/* Buttons */}
        <Animated.View style={[styles.buttonsContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              { backgroundColor: themeColor.buttonBackground },
            ]}
            onPress={handleContinueShopping}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryButtonText, { color: themeColor.white }]}>
              {t('order.continue_shopping')}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: wp('6%'),
      paddingVertical: hp('6%'),
      alignItems: 'center',
    },

    // Icon
    iconContainer: {
      marginBottom: hp('4%'),
    },
    iconCircle: {
      width: wp('30%'),
      height: wp('30%'),
      borderRadius: wp('15%'),
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 10,
    },

    // Title
    titleContainer: {
      alignItems: 'center',
      marginBottom: hp('4%'),
    },
    successTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f26,
      textAlign: 'center',
      marginBottom: hp('1%'),
    },
    successSubtitle: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      textAlign: 'center',
      lineHeight: 22,
    },

    // Details Card
    detailsCard: {
      width: '100%',
      borderRadius: wp('5%'),
      padding: wp('5%'),
      marginBottom: hp('2%'),
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: hp('1%'),
    },
    detailLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },
    detailValue: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
      maxWidth: '55%',
      textAlign: 'right',
    },
    detailValueBold: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
    divider: {
      height: 1,
      marginVertical: hp('0.5%'),
    },
    statusBadge: {
      paddingHorizontal: wp('3%'),
      paddingVertical: 4,
      borderRadius: wp('3%'),
    },
    statusText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f12,
    },

    // Delivery note
    deliveryNote: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('2%'),
      marginBottom: hp('4%'),
      paddingHorizontal: wp('2%'),
    },
    deliveryNoteText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f13,
      flex: 1,
    },

    // Buttons
    buttonsContainer: {
      width: '100%',
      gap: hp('1.5%'),
    },
    primaryButton: {
      borderRadius: wp('8%'),
      paddingVertical: hp('2%'),
      alignItems: 'center',
    },
    primaryButtonText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
  });
