import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useSearchProducts } from '@/hooks/useProducts';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { FASHION_CATEGORIES } from '@/utils/categories.utils';
import type { FashionCategory } from '@/utils/categories.utils';
import { fontSize, fontFamily, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';
import type { Product } from '@/types/app.types';
import SearchBox from '@/components/inputs/TextInput/SearchBox';
import CategoryCard from '@/components/cards/CategoryCard';
import ProductCard from '@/components/cards/ProductCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = wp('4%');
const COLUMN_GAP = wp('3%');
const NUM_COLUMNS = 2;
const CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - COLUMN_GAP) / NUM_COLUMNS;
const CATEGORY_CARD_WIDTH = (SCREEN_WIDTH - HORIZONTAL_PADDING * 3) / 2;
const CATEGORY_CARD_HEIGHT = hp('20%');

export default function SearchScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyle);

  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const { recentSearches, addSearch, clearSearches } = useRecentSearches();

  const {
    products,
    loading,
    loadingMore,
    loadMore,
    searchQuery,
    setSearchQuery,
    error,
    hasNextPage,
  } = useSearchProducts();

  const isSearching = searchQuery.trim().length > 0;

  // ─── Handlers ───────────────────────────────────────────────────────────────

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

  const handleCategoryPress = useCallback(
    (category: FashionCategory) => {
      Keyboard.dismiss();
      navigation.navigate('CategoryProducts', {
        categoryTitle: category.title,
        sortKey: category.sortKey,
        query: category.query,
      });
    },
    [navigation],
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    Keyboard.dismiss();
  }, [setSearchQuery]);

  const handleRecentSearchPress = useCallback(
    (query: string) => {
      setSearchQuery(query);
      addSearch(query);
      Keyboard.dismiss();
    },
    [setSearchQuery, addSearch],
  );

  // ─── Render helpers ──────────────────────────────────────────────────────────

  const renderProductItem = ({
    item,
    index,
  }: {
    item: Product;
    index: number;
  }) => (
    <View
      style={[
        styles.productCardWrapper,
        index % 2 === 0
          ? { marginRight: COLUMN_GAP / 2 }
          : { marginLeft: COLUMN_GAP / 2 },
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

  const renderRecentSearches = () => {
    if (recentSearches.length === 0) return null;
    
    return (
      <View style={styles.recentSearchesSection}>
        <View style={styles.recentHeaderRow}>
          <Text style={[styles.sectionTitle, { color: themeColor.text, marginBottom: 0 }]}>
            {t('search.recent_searches', 'Recent Searches')}
          </Text>
          <TouchableOpacity onPress={clearSearches}>
            <Text style={[styles.clearAllText, { color: themeColor.buttonBackground }]}>
              {t('search.clear_all', 'CLEAR ALL')}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.recentSearchesContainer}>
          {recentSearches.map((query, index) => {
            const displayText = query.length > 20 ? query.substring(0, 20) + '...' : query;
            return (
              <TouchableOpacity
                key={`recent-${index}`}
                style={[styles.recentSearchChip, { backgroundColor: themeColor.backgroundColorS1 }]}
                onPress={() => handleRecentSearchPress(query)}
              >
                <Text style={[styles.recentSearchText, { color: themeColor.text }]} numberOfLines={1}>
                  {displayText}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderCategories = () => (
    <View style={styles.categoriesSection}>
      <Text style={[styles.sectionTitle, { color: themeColor.text }]}>
        {t('category.shop_by_category', 'Shop by Category')}
      </Text>

      <View style={styles.categoryGrid}>
        {FASHION_CATEGORIES.map((cat, index) => {
          const isLastOdd =
            FASHION_CATEGORIES.length % 2 !== 0 &&
            index === FASHION_CATEGORIES.length - 1;
          return (
            <View
              key={cat.id}
              style={[
                styles.categoryCardWrapper,
                isLastOdd && styles.categoryCardFull,
              ]}
            >
              <CategoryCard
                title={t(cat.titleKey, cat.title)}
                image={cat.image}
                onPress={() => handleCategoryPress(cat)}
                cardWidth={
                  isLastOdd
                    ? SCREEN_WIDTH - HORIZONTAL_PADDING * 2
                    : CATEGORY_CARD_WIDTH
                }
                cardHeight={CATEGORY_CARD_HEIGHT}
              />
            </View>
          );
        })}
      </View>
    </View>
  );

  const renderSearchResults = () => {
    if (loading) {
      return (
        <View style={styles.centeredState}>
          <ActivityIndicator size="large" color={themeColor.buttonBackground} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centeredState}>
          <Ionicons
            name="alert-circle-outline"
            size={52}
            color={themeColor.textS1}
          />
          <Text style={[styles.stateText, { color: themeColor.textS1 }]}>
            {t('category.failed_to_load', 'Failed to load products')}
          </Text>
        </View>
      );
    }

    if (products.length === 0) {
      return (
        <View style={styles.centeredState}>
          <Ionicons name="search-outline" size={52} color={themeColor.textS1} />
          <Text style={[styles.stateText, { color: themeColor.textS1 }]}>
            {t('search.no_results', 'No results for "{{query}}"', {
              query: searchQuery,
            })}
          </Text>
          <Text style={[styles.stateSubText, { color: themeColor.textS1 }]}>
            {t('search.try_different', 'Try a different keyword')}
          </Text>
        </View>
      );
    }

    return (
      <>
        {/* Result count */}
        <View style={styles.resultCountRow}>
          <Text style={[styles.resultCount, { color: themeColor.textS1 }]}>
            {products.length}
            {hasNextPage ? '+' : ''} {t('category.items', 'items')}
          </Text>
        </View>

        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={renderProductItem}
          numColumns={NUM_COLUMNS}
          contentContainerStyle={styles.productListContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          removeClippedSubviews
          maxToRenderPerBatch={8}
          windowSize={7}
          initialNumToRender={8}
          scrollEnabled={false}
        />
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColor.backgroundColor },
      ]}
    >
      {/* ─── Sticky Header: Safe area + search bar ─── */}
      {/* <SafeAreaView edges={['top']} style={styles.headerSafeArea}> */}
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: themeColor.text }]}>
          {t('search.title', 'Search')}
        </Text>

        <View style={styles.searchRow}>
          <SearchBox
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeHolder={t('search.placeholder', 'Search clothes, styles...')}
            style={styles.searchBox}
            onSubmitEditing={() => addSearch(searchQuery)}
            returnKeyType="search"
          />

          {isSearching && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={handleClearSearch}
              accessibilityLabel={t('search.cancel', 'Cancel')}
            >
              <Text
                style={[
                  styles.cancelText,
                  { color: themeColor.buttonBackground },
                ]}
              >
                {t('search.cancel', 'Cancel')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* </SafeAreaView> */}

      {/* ─── Scrollable body ─── */}
      <FlatList
        data={[]}
        renderItem={null}
        keyExtractor={() => 'dummy'}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          isSearching ? (
            renderSearchResults()
          ) : (
            <View>
              {renderRecentSearches()}
              {renderCategories()}
            </View>
          )
        }
        contentContainerStyle={styles.scrollContent}
      />
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    // ─── Header ──────────────────────────────────────────────────────────────
    headerSafeArea: {
      zIndex: 10,
    },
    header: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: hp('1%'),
      paddingBottom: hp('1.5%'),
      gap: hp('1.2%'),
    },
    screenTitle: {
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      letterSpacing: -0.5,
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp('2%'),
    },
    searchBox: {
      flex: 1,
    },
    cancelBtn: {
      paddingVertical: hp('0.5%'),
    },
    cancelText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },

    // ─── Scroll body ─────────────────────────────────────────────────────────
    scrollContent: {
      paddingBottom: hp('12%'),
    },

    // ─── Recent Searches ─────────────────────────────────────────────────────
    recentSearchesSection: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: hp('2%'),
      paddingBottom: hp('1%'),
    },
    recentHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp('1.5%'),
    },
    clearAllText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.semiBold,
      textTransform: 'uppercase',
    },
    recentSearchesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: wp('2.5%'),
    },
    recentSearchChip: {
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1%'),
      borderRadius: wp('5%'),
    },
    recentSearchText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
    },

    // ─── Categories ──────────────────────────────────────────────────────────
    categoriesSection: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: hp('1.5%'),
    },
    sectionTitle: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      marginBottom: hp('1.5%'),
    },
    categoryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: wp('4%'),
    },
    categoryCardWrapper: {},
    categoryCardFull: {
      width: '100%',
    },

    // ─── Search results ───────────────────────────────────────────────────────
    resultCountRow: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: hp('1.5%'),
      paddingBottom: hp('0.5%'),
      alignItems: 'flex-end',
    },
    resultCount: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
    },
    productListContent: {
      paddingHorizontal: HORIZONTAL_PADDING,
      paddingTop: hp('0.5%'),
    },
    columnWrapper: {
      marginBottom: wp('3%'),
    },
    productCardWrapper: {
      flex: 1,
    },
    footerLoader: {
      paddingVertical: hp('2%'),
      alignItems: 'center',
    },

    // ─── Empty / Error states ─────────────────────────────────────────────────
    centeredState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: hp('10%'),
      paddingHorizontal: HORIZONTAL_PADDING,
      gap: hp('1.2%'),
    },
    stateText: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.medium,
      textAlign: 'center',
      marginTop: hp('0.5%'),
    },
    stateSubText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.regular,
      textAlign: 'center',
    },
  });
