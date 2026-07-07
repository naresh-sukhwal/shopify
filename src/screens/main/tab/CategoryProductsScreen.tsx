import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useProducts } from '@/hooks/useProducts';
import { fontSize, fontFamily, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';
import type { Product } from '@/types/app.types';
import ProductCard from '@/components/cards/ProductCard';
import SafeAreaWrapper from '@/components/hoc/SafeAreaWrapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const HORIZONTAL_PADDING = wp('4%');
const COLUMN_GAP = wp('3%');
const CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / NUM_COLUMNS;

export default function CategoryProductsScreen() {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyle);

  const { categoryTitle, sortKey, query } = route.params as {
    categoryTitle: string;
    sortKey?: string;
    query?: string;
  };

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const {
    products,
    loading,
    loadingMore,
    refreshing,
    error,
    hasNextPage,
    loadMore,
    refresh,
  } = useProducts({
    first: 10,
    sortKey: sortKey,
    query: query,
  });

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetail', { product });
    },
    [navigation],
  );

  const handleWishlistPress = useCallback((product: Product) => {
    setFavoriteIds(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id],
    );
  }, []);

  const renderItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => (
    <View
      style={[
        styles.cardWrapper,
        index % 2 === 0 ? { marginRight: COLUMN_GAP / 2 } : { marginLeft: COLUMN_GAP / 2 },
      ]}
    >
      <ProductCard
        item={item}
        cardWidth={CARD_WIDTH}
        showWishlist
        showDiscount
        showOldPrice
        showRating={false}
        isFavorite={favoriteIds.includes(item.id)}
        onPress={handleProductPress}
        onWishlist={handleWishlistPress}
      />
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={themeColor.buttonBackground} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="shirt-outline"
          size={64}
          color={themeColor.textS1}
        />
        <Text style={[styles.emptyText, { color: themeColor.textS1 }]}>
          {error
            ? t('category.failed_to_load', 'Failed to load products')
            : t('category.no_products', 'No products found')}
        </Text>
        {error && (
          <TouchableOpacity
            style={[
              styles.retryButton,
              { backgroundColor: themeColor.buttonBackground },
            ]}
            onPress={refresh}
          >
            <Text style={[styles.retryText, { color: themeColor.white }]}>
              {t('category.retry', 'Retry')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaWrapper useSafeArea={false} statusBarColor={themeColor.backgroundColor} StatusBarStyle="dark-content">
      <View style={[styles.container, { backgroundColor: themeColor.backgroundColor }]}>
        {/* ─── Header ─── */}
        <SafeAreaView edges={['top']} style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: themeColor.grayS3 }]}
            onPress={() => navigation.goBack()}
            accessibilityLabel={t('common.back', 'Back')}
          >
            <Ionicons name="arrow-back" size={20} color={themeColor.text} />
          </TouchableOpacity>

          <Text
            style={[styles.headerTitle, { color: themeColor.text }]}
            numberOfLines={1}
          >
            {categoryTitle}
          </Text>

          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: themeColor.grayS3 }]}
            accessibilityLabel={t('category.search', 'Search')}
          >
            <Ionicons name="search-outline" size={20} color={themeColor.text} />
          </TouchableOpacity>
        </SafeAreaView>

        {/* ─── Sub-header: item count ─── */}
        {!loading && products.length > 0 && (
          <View style={styles.subHeader}>
            <Text style={[styles.itemCount, { color: themeColor.textS1 }]}>
              {products.length}
              {hasNextPage ? '+' : ''}{' '}
              {t('category.items', 'items')}
            </Text>
          </View>
        )}

        {/* ─── Loading state ─── */}
        {loading && products.length === 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator
              size="large"
              color={themeColor.buttonBackground}
            />
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            numColumns={NUM_COLUMNS}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            onRefresh={refresh}
            refreshing={refreshing}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            removeClippedSubviews
            maxToRenderPerBatch={8}
            windowSize={7}
            initialNumToRender={8}
          />
        )}
      </View>
    </SafeAreaWrapper>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    // ─── Header ───────────────────────────────────────────────────
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('4%'),
      paddingTop: hp('1%'),
      paddingBottom: hp('1.5%'),
      gap: wp('3%'),
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      flex: 1,
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      textAlign: 'center',
    },

    // ─── Sub-header ───────────────────────────────────────────────
    subHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('1%'),
    },
    itemCount: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
    },

    // ─── List ─────────────────────────────────────────────────────
    listContent: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingBottom: hp('10%'),
      paddingTop: hp('0.5%'),
    },
    columnWrapper: {
      marginBottom: wp('3%'),
    },
    cardWrapper: {
      flex: 1,
    },

    // ─── Loading / Empty ──────────────────────────────────────────
    loaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerLoader: {
      paddingVertical: hp('2%'),
      alignItems: 'center',
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: hp('15%'),
      gap: hp('1.5%'),
    },
    emptyText: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.medium,
      textAlign: 'center',
      marginTop: hp('1%'),
    },
    retryButton: {
      marginTop: hp('1.5%'),
      paddingHorizontal: wp('6%'),
      paddingVertical: hp('1.2%'),
      borderRadius: wp('6%'),
    },
    retryText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },
  });
