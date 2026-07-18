import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { useCartStore } from '@/store/cartStore';
import { useCartOperations } from '@/hooks/useCartOperations';
import CartItemCard from '@/components/cards/CartItemCard';
import Price from '@/components/common/Price';
import { useAddressStore } from '@/store/addressStore';
import FixedBottomButton from '@/components/buttons/FixedBottomButton';
import SimpleHeader from '@/components/headers/SimpleHeader';

export default function CartScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  const { cart } = useCartStore();
  const { addresses } = useAddressStore();
  const { updateQuantity, removeItem, loading, refreshing, refreshCart } =
    useCartOperations();

  useFocusEffect(
    useCallback(() => {
      refreshCart();
    }, [refreshCart]),
  );

  const items = cart?.items || [];
  const totalQuantity = cart?.totalQuantity || 0;
  const subtotalAmount = cart?.subtotalAmount?.amount || '0';
  const currencyCode = cart?.subtotalAmount?.currencyCode || 'USD';
  const handleIncrease = useCallback(
    (lineId: string, currentQty: number) => {
      updateQuantity(lineId, currentQty + 1);
    },
    [updateQuantity],
  );

  const handleDecrease = useCallback(
    (lineId: string, currentQty: number) => {
      if (currentQty > 1) {
        updateQuantity(lineId, currentQty - 1);
      } else {
        removeItem(lineId);
      }
    },
    [updateQuantity, removeItem],
  );

  const handleRemove = useCallback(
    (lineId: string) => {
      removeItem(lineId);
    },
    [removeItem],
  );

  const renderOrderSummary = () => (
    <View
      style={[
        styles.summaryCard,
        { backgroundColor: themeColor.backgroundColorS1 },
      ]}
    >
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: themeColor.textS1 }]}>
          {t('cart.subtotal', 'Subtotal')}
        </Text>
        <Text style={[styles.summaryValue, { color: themeColor.text }]}>
          <Price price={subtotalAmount} currency={currencyCode} />
        </Text>
      </View>
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

      <View style={styles.summaryRow}>
        <Text style={[styles.totalLabel, { color: themeColor.text }]}>
          {t('cart.total', 'Total')}
        </Text>
        <Text
          style={[styles.totalValue, { color: themeColor.buttonBackground }]}
        >
          <Price price={subtotalAmount} currency={currencyCode} size="medium" />
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="shopping-bag" size={64} color={themeColor.textS1} />
      <Text style={[styles.emptyTitle, { color: themeColor.text }]}>
        {t('cart.empty_title', 'Your bag is empty')}
      </Text>
      <Text style={[styles.emptyDesc, { color: themeColor.textS1 }]}>
        {t(
          'cart.empty_subtitle',
          "Looks like you haven't added anything to your bag yet.",
        )}
      </Text>

      <TouchableOpacity
        style={[
          styles.shopButton,
          { backgroundColor: themeColor.buttonBackground },
        ]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.shopButtonText, { color: themeColor.white }]}>
          {t('cart.start_shopping', 'Start Shopping')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <AppBackground backgroundColor={themeColor.primary}>
      <SimpleHeader title="Stylo" />

      {(loading || (refreshing && items.length === 0)) && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color={themeColor.buttonBackground} />
        </View>
      )}

      {items.length === 0 ? (
        renderEmpty()
      ) : (
        <View style={styles.content}>
          <FlatList
            style={{ flex: 1 }}
            data={items}
            keyExtractor={item => item.lineId}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshCart}
                colors={[themeColor.buttonBackground]}
                tintColor={themeColor.buttonBackground}
              />
            }
            ListHeaderComponent={
              <View style={styles.listHeader}>
                <Text style={[styles.bagTitle, { color: themeColor.text }]}>
                  {t('cart.title', 'Shopping Bag')}{' '}
                  <Text style={{ color: themeColor.buttonBackground }}>
                    ({totalQuantity})
                  </Text>
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <CartItemCard
                item={item}
                onIncrease={() => handleIncrease(item.lineId, item.quantity)}
                onDecrease={() => handleDecrease(item.lineId, item.quantity)}
                onRemove={() => handleRemove(item.lineId)}
              />
            )}
            ListFooterComponent={
              <View style={styles.listFooter}>
                <Text style={[styles.summaryTitle, { color: themeColor.text }]}>
                  Order Summary
                </Text>
                {renderOrderSummary()}
              </View>
            }
          />

          {/* Fixed Bottom Bar */}
          <FixedBottomButton
            title={t('cart.proceed_to_checkout')}
            icon="arrow-right"
            onPress={() => {
              if (addresses.length > 0) {
                navigation.navigate('CheckoutAddressScreen');
              } else {
                navigation.navigate('AddAddressScreen');
              }
            }}
            topContent={
              <View style={styles.bottomBarRow}>
                <View>
                  <Text
                    style={[
                      styles.totalAmountLabel,
                      { color: themeColor.textS1 },
                    ]}
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
                      price={subtotalAmount}
                      currency={currencyCode}
                      size="medium"
                    />
                  </Text>
                </View>
                <Text style={[styles.itemsCount, { color: themeColor.textS1 }]}>
                  {totalQuantity} {t('cart.items')}
                </Text>
              </View>
            }
          />
        </View>
      )}
      {/* </SafeAreaView> */}
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.primary,
    },

    content: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('1%'),
    },
    listHeader: {
      marginTop: hp('2%'),
      marginBottom: hp('1%'),
    },
    bagTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f20,
    },
    listFooter: {
      marginTop: hp('4%'),
    },
    summaryTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f18,
      marginBottom: hp('2%'),
    },
    summaryCard: {
      borderRadius: wp('5%'),
      padding: wp('5%'),
      marginBottom: hp('2%'),
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    summaryRowMargin: {
      marginTop: hp('1.5%'),
    },
    summaryLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },
    summaryValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
    },
    shippingContainer: {
      marginTop: hp('1.5%'),
      flexDirection: 'row',
      alignItems: 'center',
      padding: wp('3%'),
      borderRadius: wp('5%'),
      gap: wp('2%'),
    },
    divider: {
      height: 1,
      marginVertical: hp('2%'),
    },
    totalLabel: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
    totalValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
    loaderOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255,255,255,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
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
      marginTop: hp('0.5%'),
    },
    itemsCount: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: wp('8%'),
      marginTop: -hp('10%'),
    },
    emptyTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f20,
      marginTop: hp('2%'),
      marginBottom: hp('1%'),
    },
    emptyDesc: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
      textAlign: 'center',
      marginBottom: hp('4%'),
    },
    shopButton: {
      paddingHorizontal: wp('8%'),
      paddingVertical: hp('1.8%'),
      borderRadius: wp('6%'),
    },
    shopButtonText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
  });
