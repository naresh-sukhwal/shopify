import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { useCartStore } from '@/store/cartStore';
import { useAddressStore } from '@/store/addressStore';
import SimpleHeader from '@/components/headers/SimpleHeader';
import FixedBottomButton from '@/components/buttons/FixedBottomButton';
import CheckoutStepper from '@/components/common/CheckoutStepper';
import { Address } from '@/types/app.types';

export default function CheckoutAddressScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);
  const { cart } = useCartStore();
  const { addresses, selectedAddressId, setSelectedAddressId } =
    useAddressStore();

  const {
    isDirectBuy,
    directCartId,
    directCheckoutUrl,
    directAmount,
    directCurrency,
    isFromProfile,
  } = route.params || {};

  // Resolve the active selection: store value → default → first
  const activeSelectedId =
    selectedAddressId ||
    addresses.find(a => a.isDefault)?.id ||
    addresses[0]?.id ||
    '';

  const subtotalAmount = isDirectBuy
    ? directAmount || '0'
    : cart?.subtotalAmount?.amount || '0';
  const currencyCode = isDirectBuy
    ? directCurrency || 'USD'
    : cart?.subtotalAmount?.currencyCode || 'USD';

  return (
    <AppBackground backgroundColor={themeColor.primary}>
      <SimpleHeader title="Stylo" />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CheckoutStepper activeStep={1} />

        <View style={styles.titleContainer}>
          <Text style={[styles.mainTitle, { color: themeColor.text }]}>
            {t('checkout.address_title')}
          </Text>
          <Text style={[styles.subTitle, { color: themeColor.textS1 }]}>
            {t('checkout.address_subtitle')}
          </Text>
        </View>

        <View style={styles.addressList}>
          {addresses.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather name="map-pin" size={40} color={themeColor.textS1} />
              <Text style={[styles.emptyText, { color: themeColor.textS1 }]}>
                {t('checkout.no_addresses', 'No saved addresses yet.')}
              </Text>
            </View>
          ) : (
            addresses.map(address => {
              const isSelected = activeSelectedId === address.id;
              return (
                <TouchableOpacity
                  key={address.id}
                  style={[
                    styles.addressCard,
                    {
                      backgroundColor: themeColor.backgroundColorS1,
                      borderColor: isSelected
                        ? themeColor.buttonBackground
                        : themeColor.borderColor,
                    },
                  ]}
                  onPress={() => setSelectedAddressId(address.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.titleRow}>
                      <Text
                        style={[styles.cardTitle, { color: themeColor.text }]}
                      >
                        {t(address.title)}
                      </Text>
                      {address.isDefault && (
                        <Text
                          style={[
                            styles.defaultBadge,
                            { color: themeColor.buttonBackground },
                          ]}
                        >
                          {t('checkout.default')}
                        </Text>
                      )}
                    </View>
                    <View
                      style={[
                        styles.radioCircle,
                        {
                          borderColor: isSelected
                            ? themeColor.buttonBackground
                            : themeColor.placeHolderColor,
                        },
                      ]}
                    >
                      {isSelected && (
                        <View
                          style={[
                            styles.radioDot,
                            { backgroundColor: themeColor.buttonBackground },
                          ]}
                        />
                      )}
                    </View>
                  </View>
                  <Text style={[styles.nameText, { color: themeColor.textS1 }]}>
                    {address.name}
                  </Text>
                  <Text
                    style={[styles.addressText, { color: themeColor.textS1 }]}
                  >
                    {address.address}
                  </Text>
                  <Text
                    style={[styles.phoneText, { color: themeColor.textS1 }]}
                  >
                    {address.phone}
                  </Text>
                </TouchableOpacity>
              );
            })
          )}

          <TouchableOpacity
            style={[
              styles.addNewCard,
              {
                borderColor: themeColor.placeHolderColor,
                backgroundColor: themeColor.backgroundColorS1,
              },
            ]}
            onPress={() => navigation.navigate('AddAddressScreen')}
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={themeColor.textS1}
            />
            <Text style={[styles.addNewText, { color: themeColor.textS1 }]}>
              {t('checkout.add_new_address')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {!isFromProfile && (
        <FixedBottomButton
          title={t('checkout.review_continue')}
          icon="arrow-right"
          disabled={!activeSelectedId}
          onPress={() => {
            if (!activeSelectedId) return;
            navigation.navigate('PaymentScreen', {
              addressId: activeSelectedId,
              totalAmount: subtotalAmount,
              shippingAmount: subtotalAmount,
              currency: currencyCode,
              isDirectBuy,
              directCartId,
              directCheckoutUrl,
            });
          }}
          topContent={
            <View style={{ marginBottom: hp('0%') }}>
              <Text
                style={[
                  styles.estimatedTotalLabel,
                  { color: themeColor.textS1 },
                ]}
              >
                {t('checkout.estimated_total')}
              </Text>
              <Text
                style={[
                  styles.estimatedTotalValue,
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
          }
        />
      )}
    </AppBackground>
  );
}

const createStyles = (_theme: themeType) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('4%'),
    },

    titleContainer: {
      marginBottom: hp('3%'),
    },
    mainTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f22,
      marginBottom: hp('0.5%'),
    },
    subTitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },
    addressList: {
      gap: hp('2%'),
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: hp('4%'),
      gap: hp('1.5%'),
    },
    emptyText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
      textAlign: 'center',
    },
    addressCard: {
      borderRadius: wp('4%'),
      borderWidth: 1,
      padding: wp('5%'),
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp('1.5%'),
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('2%'),
    },
    cardTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
    defaultBadge: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f10,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    radioCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    nameText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
      marginBottom: hp('1%'),
    },
    addressText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      lineHeight: 20,
      marginBottom: hp('1%'),
    },
    phoneText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
    },
    addNewCard: {
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: wp('4%'),
      padding: wp('6%'),
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: hp('1%'),
    },
    addNewText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
    },
    estimatedTotalLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
      textTransform: 'uppercase',
    },
    estimatedTotalValue: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f18,
    },
  });
