import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fontSize, fontFamily } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';

interface PriceProps {
  price: number | string;
  oldPrice?: number | string;
  discount?: number;
  currency?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Price({
  price,
  oldPrice,
  discount,
  currency = '$',
  size = 'medium',
}: PriceProps) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  const getPriceStyle = () => {
    switch (size) {
      case 'small':
        return styles.priceSmall;
      case 'large':
        return styles.priceLarge;
      case 'medium':
      default:
        return styles.priceMedium;
    }
  };

  const getOldPriceStyle = () => {
    switch (size) {
      case 'small':
        return styles.oldPriceSmall;
      case 'large':
        return styles.oldPriceLarge;
      case 'medium':
      default:
        return styles.oldPriceMedium;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[getPriceStyle(), { color: themeColor.buttonBackground }]}>
        {currency}{price}
      </Text>
      {oldPrice && (
        <Text style={[getOldPriceStyle(), { color: themeColor.textS2 }]}>
          {currency}{oldPrice}
        </Text>
      )}
      {discount && discount > 0 && (
        <Text style={[styles.discountText, { color: themeColor.red }]}>
          {discount}% off
        </Text>
      )}
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
    },
    priceSmall: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.semiBold,
    },
    priceMedium: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
    },
    priceLarge: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
    },
    oldPriceSmall: {
      fontSize: fontSize.f10,
      fontFamily: fontFamily.regular,
      textDecorationLine: 'line-through',
    },
    oldPriceMedium: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      textDecorationLine: 'line-through',
    },
    oldPriceLarge: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      textDecorationLine: 'line-through',
    },
    discountText: {
      fontSize: fontSize.f10,
      fontFamily: fontFamily.semiBold,
    },
  });
