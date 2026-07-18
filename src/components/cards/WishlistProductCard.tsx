import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fontSize, fontFamily, Ionicons } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
import { hp, wp } from '@/utils/responsive.utils';
import type { Product } from '@/types/app.types';
import Price from '../common/Price';

export interface WishlistProductCardProps {
  item: Product;
  isFavorite?: boolean;
  onPress: (product: Product) => void;
  onWishlist: (product: Product) => void;
}

export default function WishlistProductCard({
  item,
  isFavorite = true,
  onPress,
  onWishlist,
}: WishlistProductCardProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  // Create a subtitle from options if available (e.g., Color • Size)
  const getSubtitle = () => {
    if (!item.options || item.options.length === 0) return item.vendor;
    const parts = item.options.map(opt => opt.values[0]).filter(Boolean);
    return parts.length > 0 ? parts.slice(0, 2).join(' • ') : item.vendor;
  };
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item)}
      style={[styles.card, { backgroundColor: themeColor.white }]}
      accessibilityLabel={item.title}
      accessibilityRole="button"
    >
      <View
        style={[styles.imageContainer, { backgroundColor: themeColor.grayS3 }]}
      >
        {item.featuredImage ? (
          <FastImage
            source={{ uri: item.featuredImage.url }}
            style={styles.productImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {/* Out of stock overlay on image */}
        {!item.availableForSale && (
          <View style={styles.outOfStockOverlay}>
            <Text style={[styles.outOfStockText, { color: themeColor.white }]}>
              {t('home.out_of_stock', 'Out of Stock')}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.contentContainer}>
        {/* Top Row: Title & Heart */}
        <View style={styles.topRow}>
          <Text
            style={[styles.title, { color: themeColor.text }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <TouchableOpacity
            onPress={() => onWishlist(item)}
            style={styles.heartButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? themeColor.red : themeColor.textS2}
            />
          </TouchableOpacity>
        </View>

        {/* Subtitle */}
        <Text
          style={[styles.subtitle, { color: themeColor.textS2 }]}
          numberOfLines={1}
        >
          {getSubtitle()}
        </Text>

        {/* Bottom Row: Price/Rating & Shop Button */}
        <View style={styles.bottomRow}>
          <View style={styles.priceRatingContainer}>
            <Price
              price={item.minPrice.amount}
              currency={
                item.minPrice.currencyCode === 'USD'
                  ? '$'
                  : item.minPrice.currencyCode
              }
              size="medium"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.shopButton,
              { backgroundColor: themeColor.buttonBackground },
            ]}
            onPress={() => onPress(item)}
          >
            <Text style={[styles.shopButtonText, { color: themeColor.white }]}>
              {t('wishlist.shop', 'Shop')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      borderRadius: 16,
      padding: wp('3%'),
      marginBottom: hp('2%'),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    imageContainer: {
      width: wp('24%'),
      height: wp('24%'),
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
    },
    outOfStockOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    outOfStockText: {
      fontSize: fontSize.f10,
      fontFamily: fontFamily.bold,
      textAlign: 'center',
    },
    contentContainer: {
      flex: 1,
      marginLeft: wp('4%'),
      justifyContent: 'space-between',
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      fontSize: fontSize.f16,
      fontFamily: fontFamily.semiBold,
      marginRight: wp('2%'),
    },
    heartButton: {
      padding: 2,
    },
    subtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.regular,
      marginTop: hp('0.5%'),
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: hp('1%'),
    },
    priceRatingContainer: {
      flex: 1,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
      gap: 4,
    },
    ratingText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
    },
    shopButton: {
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('0.8%'),
      borderRadius: 20,
    },
    shopButtonText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.semiBold,
    },
  });
