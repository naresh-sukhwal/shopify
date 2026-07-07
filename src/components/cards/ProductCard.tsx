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
import { fontSize, fontFamily } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
import { hp, wp } from '@/utils/responsive.utils';
import type { Product } from '@/types/app.types';
import Price from '../common/Price';
import FavoriteButton from '../buttons/FavoriteButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SPACING = wp('4%');
const CARD_WIDTH = (SCREEN_WIDTH - SPACING * 3) / 2;

export interface ProductCardProps {
  item: Product;
  showWishlist?: boolean;
  showRating?: boolean;
  showDiscount?: boolean;
  showOldPrice?: boolean;
  isFavorite?: boolean;
  badgeText?: string;
  cartIcon?: React.ReactNode;
  onPress: (product: Product) => void;
  onWishlist?: (product: Product) => void;
  onCartPress?: (product: Product) => void;
  cardWidth?: number;
}

export default function ProductCard({
  item,
  showWishlist = true,
  showRating = false,
  showDiscount = true,
  showOldPrice = true,
  isFavorite = false,
  badgeText,
  cartIcon,
  onPress,
  onWishlist,
  onCartPress,
  cardWidth = CARD_WIDTH,
}: ProductCardProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  const hasDiscount =
    item.discountPercentage !== null && (item.discountPercentage ?? 0) > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onPress(item)}
      style={[
        styles.card,
        { backgroundColor: 'transparent', width: cardWidth },
      ]}
      accessibilityLabel={item.title}
      accessibilityRole="button"
    >
      <View
        style={[styles.imageContainer, { backgroundColor: themeColor.white }]}
      >
        {item.featuredImage ? (
          <FastImage
            source={{ uri: item.featuredImage.url }}
            style={styles.productImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View
            style={[
              styles.productImage,
              styles.imagePlaceholder,
              { backgroundColor: themeColor.grayS2 },
            ]}
          />
        )}

        {/* Wishlist Button */}
        {showWishlist && (
          <View style={styles.wishlistContainer}>
            <FavoriteButton
              selected={isFavorite}
              onPress={() => onWishlist && onWishlist(item)}
              size={14}
            />
          </View>
        )}

        {/* Badge (e.g. #1, #2) */}
        {badgeText && (
          <View
            style={[
              styles.badge,
              { backgroundColor: themeColor.buttonBackground },
            ]}
          >
            <Text style={[styles.badgeText, { color: themeColor.white }]}>
              {badgeText}
            </Text>
          </View>
        )}

        {/* Cart Icon (Flash Sale style) */}
        {cartIcon && (
          <TouchableOpacity
            style={[
              styles.cartIconContainer,
              { backgroundColor: themeColor.buttonBackground },
            ]}
            onPress={() => onCartPress && onCartPress(item)}
          >
            {cartIcon}
          </TouchableOpacity>
        )}

        {/* Out of stock overlay */}
        {!item.availableForSale && (
          <View style={styles.outOfStockOverlay}>
            <Text style={[styles.outOfStockText, { color: themeColor.white }]}>
              {t('home.out_of_stock')}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardInfo}>
        <Text
          style={[styles.productTitle, { color: themeColor.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <View style={styles.priceContainer}>
          <Price
            price={item.minPrice.amount}
            oldPrice={
              showOldPrice &&
              item.compareAtMinPrice &&
              item.compareAtMinPrice.amount > item.minPrice.amount
                ? item.compareAtMinPrice.amount
                : undefined
            }
            currency={
              item.minPrice.currencyCode === 'USD'
                ? '$'
                : item.minPrice.currencyCode
            }
            discount={
              showDiscount && hasDiscount ? item.discountPercentage! : undefined
            }
            size="medium"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    card: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      aspectRatio: 1, // 1:1 ratio for images is standard
    },
    imagePlaceholder: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    wishlistContainer: {
      position: 'absolute',
      top: 8,
      right: 8,
    },
    badge: {
      position: 'absolute',
      top: 8,
      left: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.bold,
    },
    cartIconContainer: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    outOfStockOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    outOfStockText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
    },
    cardInfo: {
      paddingVertical: hp('1.5%'),
      paddingHorizontal: wp('1%'),
    },
    productTitle: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      marginBottom: hp('0.5%'),
      minHeight: fontSize.f14 * 2.8, // Reserve exactly 2 lines height
    },
    priceContainer: {
      marginTop: 2,
    },
  });
