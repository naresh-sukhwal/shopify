import React, { useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import {
  fontFamily,
  fontSize,
  Feather,
  Ionicons,
} from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';
import { useProducts } from '@/hooks/useProducts';
import { useWishlist } from '@/hooks/useWishlist';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/app.types';
import { AppBackground } from '@/components';
import WishlistProductCard from '@/components/cards/WishlistProductCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WishlistScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);
  const { wishlistIds, isWishlisted, toggleWishlist } = useWishlist();
  const { totalQuantity } = useCartStore();
  const { products, loading, refreshing, refresh } = useProducts({ first: 50 });

  const wishlistedProducts = useMemo(() => {
    const productMap = new Map(products.map(p => [p.id, p]));
    return wishlistIds
      .map(id => productMap.get(id))
      .filter((p): p is Product => p !== undefined);
  }, [products, wishlistIds]);

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { product });
    },
    [navigation],
  );

  const handleWishlistPress = useCallback(
    (product: Product) => {
      toggleWishlist(product.id);
    },
    [toggleWishlist],
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <WishlistProductCard
        item={item}
        isFavorite={isWishlisted(item.id)}
        onPress={handleProductPress}
        onWishlist={handleWishlistPress}
      />
    ),
    [isWishlisted, handleProductPress, handleWishlistPress],
  );

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.countText}>
        {t('wishlist.items_saved', { count: wishlistIds.length })}
      </Text>
      <View style={styles.sortChip}>
        <Feather
          name="align-right"
          size={12}
          color={themeColor.buttonBackground}
        />
        <Text style={styles.sortText}>{t('wishlist.recently_added')}</Text>
      </View>
    </View>
  );

  // ─── Empty State ─────────────────────────────────────────────────────────────
  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={themeColor.buttonBackground} />
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>{t('wishlist.empty_title')}</Text>
        <Text style={styles.emptyDesc}>{t('wishlist.empty_desc')}</Text>
        <TouchableOpacity
          style={[
            styles.shopBtn,
            { backgroundColor: themeColor.buttonBackground },
          ]}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={[styles.shopBtnText, { color: themeColor.white }]}>
            {t('wishlist.start_shopping')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <AppBackground backgroundColor={themeColor.primary}>
      {/* ─── Page Header ─────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>{t('wishlist.title')}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('CartScreen')}
          >
            <Ionicons name="bag-outline" size={22} color={themeColor.text} />
            {totalQuantity > 0 && (
              <View
                style={[
                  styles.cartBadge,
                  { backgroundColor: themeColor.buttonBackground },
                ]}
              >
                <Text style={styles.cartBadgeText}>
                  {totalQuantity > 9 ? '9+' : totalQuantity}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Products Grid ───────────────────────────────────────────────── */}
      <FlatList
        data={wishlistedProducts}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[themeColor.buttonBackground]}
            tintColor={themeColor.buttonBackground}
          />
        }
        ListHeaderComponent={
          wishlistedProducts.length > 0 ? renderHeader : null
        }
        ListEmptyComponent={renderEmpty}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.listContent,
          wishlistedProducts.length === 0 && styles.listContentEmpty,
        ]}
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={6}
      />
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    // ─── Header ───────────────────────────────────────────────────────────────
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('1%'),
    },
    pageTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f24,
      color: theme.buttonBackground,
      letterSpacing: -0.5,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: wp('3%'),
    },
    cartBadge: {
      position: 'absolute',
      top: -2,
      right: -8,
      minWidth: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 3,
    },
    cartBadgeText: {
      color: theme.white,
      fontSize: fontSize.f8,
      fontFamily: fontFamily.bold,
    },

    // ─── Sub-Header Row ────────────────────────────────────────────────────────
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('1.5%'),
    },
    countText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f13,
      color: theme.textS2,
      letterSpacing: 0.5,
    },
    sortChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: wp('2.5%'),
      paddingVertical: 5,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.buttonBackground,
    },
    sortText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f12,
      color: theme.buttonBackground,
    },

    // ─── Grid ─────────────────────────────────────────────────────────────────
    listContent: {
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('12%'),
    },
    listContentEmpty: {
      flex: 1,
    },

    // ─── Empty State ──────────────────────────────────────────────────────────
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: wp('10%'),
      paddingTop: hp('8%'),
    },
    emptyIconBg: {
      width: 100,
      height: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: hp('3%'),
    },
    emptyTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f20,
      color: theme.text,
      marginBottom: hp('1%'),
      textAlign: 'center',
    },
    emptyDesc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      color: theme.textS2,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: hp('4%'),
    },
    shopBtn: {
      paddingVertical: hp('1.5%'),
      paddingHorizontal: wp('10%'),
      borderRadius: 30,
    },
    shopBtnText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f15,
    },
  });
