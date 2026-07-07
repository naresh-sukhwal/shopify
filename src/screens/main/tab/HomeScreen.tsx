import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fontSize, fontFamily, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/types/app.types';
import SearchBox from '@/components/inputs/TextInput/SearchBox';
import CategoryChip from '@/components/cards/CategoryChip';
import BannerCarousel from '@/components/cards/BannerCarousel';
import HorizontalProductList from '@/components/lists/HorizontalProductList';
import { FASHION_CATEGORIES } from '@/utils/categories.utils';
import type { FashionCategory } from '@/utils/categories.utils';

// Dummy Data
const DUMMY_BANNERS = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
  },
];

const DUMMY_CATEGORIES = [
  {
    id: '1',
    title: 'Jewelry',
    image:
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&fit=crop',
  },
  {
    id: '2',
    title: 'Bags',
    image:
      'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=200&fit=crop',
  },
  {
    id: '3',
    title: 'Shoes',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&fit=crop',
  },
  {
    id: '4',
    title: 'Accessories',
    image:
      'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=200&fit=crop',
  },
  {
    id: '5',
    title: 'Clothing',
    image:
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=200&fit=crop',
  },
];

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // APIs
  const {
    products: flashSaleProducts,
    refresh: refreshFlashSale,
    loadMore: loadMoreFlashSale,
  } = useProducts({ first: 5 });
  const {
    products: featuredProducts,
    refresh: refreshFeatured,
    loadMore: loadMoreFeatured,
  } = useProducts({
    first: 5,
    sortKey: 'CREATED_AT',
  });
  const {
    products: bestSellers,
    refresh: refreshBestSellers,
    loadMore: loadMoreBestSellers,
  } = useProducts({
    first: 10,
    sortKey: 'BEST_SELLING',
  });
  const {
    products: recommendedProducts,
    refresh: refreshRecommended,
    loadMore: loadMoreRecommended,
  } = useProducts({
    first: 5,
    reverse: true,
  });
  const {
    products: recentlyViewed,
    refresh: refreshRecentlyViewed,
    loadMore: loadMoreRecentlyViewed,
  } = useProducts({ first: 5 });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refreshFlashSale(),
        refreshFeatured(),
        refreshBestSellers(),
        refreshRecommended(),
        refreshRecentlyViewed(),
      ]);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [
    refreshFlashSale,
    refreshFeatured,
    refreshBestSellers,
    refreshRecommended,
    refreshRecentlyViewed,
  ]);

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
      navigation.navigate('CategoryProducts', {
        categoryTitle: category.title,
        sortKey: category.sortKey,
        query: category.query,
      });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <Text
          style={[styles.storeName, { color: themeColor.buttonBackground }]}
        >
          Stylo
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={themeColor.text}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="bag-outline" size={24} color={themeColor.text} />
            <View
              style={[
                styles.cartBadge,
                { backgroundColor: themeColor.buttonBackground },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[themeColor.buttonBackground]}
            tintColor={themeColor.buttonBackground}
          />
        }
      >
        {/* --- Search --- */}
        <View style={styles.searchSection}>
          <SearchBox
            value={search}
            onChangeText={setSearch}
            placeHolder={t(
              'home.search_placeholder',
              'Search for collections...',
            )}
          />
        </View>

        {/* --- Banner --- */}
        <BannerCarousel data={DUMMY_BANNERS} autoPlay={true} />

        {/* --- Shop by Category --- */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: themeColor.text }]}>
              Shop by Category
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
              <Text
                style={[
                  styles.seeAllText,
                  { color: themeColor.buttonBackground },
                ]}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={FASHION_CATEGORIES}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CategoryChip
                title={item.title}
                image={item.image}
                selected={selectedCategory === item.id}
                onPress={() => handleCategoryPress(item)}
              />
            )}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        {/* --- Flash Sale --- */}
        {flashSaleProducts.length > 0 && (
          <HorizontalProductList
            title="Flash Sale"
            products={flashSaleProducts}
            onProductPress={handleProductPress}
            // titleBadge={
            //   <View
            //      style={[styles.timerBadge, { backgroundColor: themeColor.red }]}
            //    >
            //     <Text style={styles.timerText}>04:23:13</Text>
            //    </View>
            // }
            onWishlistPress={handleWishlistPress}
            getIsFavorite={product => favoriteIds.includes(product.id)}
            showWishlist={true}
            showDiscount={false}
            showRating={false}
            getCartIcon={() => (
              <Ionicons
                name="cart-outline"
                size={16}
                color={themeColor.white}
              />
            )}
            onEndReached={loadMoreFlashSale}
          />
        )}

        {/* --- Featured Products --- */}
        {featuredProducts.length > 0 && (
          <HorizontalProductList
            title="Featured Products"
            products={featuredProducts}
            onProductPress={handleProductPress}
            onWishlistPress={handleWishlistPress}
            getIsFavorite={product => favoriteIds.includes(product.id)}
            showWishlist={true} // Heart icon
            showOldPrice={false}
            showDiscount={false}
            onEndReached={loadMoreFeatured}
          />
        )}

        {/* --- Best Sellers --- */}
        {bestSellers.length > 0 && (
          <HorizontalProductList
            title="Best Sellers"
            products={bestSellers}
            onProductPress={handleProductPress}
            onWishlistPress={handleWishlistPress}
            getIsFavorite={product => favoriteIds.includes(product.id)}
            showWishlist={true}
            showOldPrice={false}
            showDiscount={false}
            getBadgeText={(_product, index) => `#${index + 1}`}
            onEndReached={loadMoreBestSellers}
          />
        )}

        {/* --- Recommended for You --- */}
        {recommendedProducts.length > 0 && (
          <HorizontalProductList
            title="Recommended for You"
            products={recommendedProducts}
            onProductPress={handleProductPress}
            onWishlistPress={handleWishlistPress}
            getIsFavorite={product => favoriteIds.includes(product.id)}
            showWishlist={true}
            showOldPrice={false}
            showDiscount={false}
            showSeeAll={false}
            onEndReached={loadMoreRecommended}
          />
        )}

        {/* --- Recently Viewed --- */}
        {recentlyViewed.length > 0 && (
          <HorizontalProductList
            title="Recently Viewed"
            products={recentlyViewed}
            onProductPress={handleProductPress}
            onWishlistPress={handleWishlistPress}
            getIsFavorite={product => favoriteIds.includes(product.id)}
            showWishlist={true}
            showOldPrice={false}
            showDiscount={false}
            showSeeAll={false}
            onEndReached={loadMoreRecentlyViewed}
          />
        )}
      </ScrollView>
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primary,
      paddingHorizontal: 10,
    },
    scrollContent: {
      paddingBottom: hp('12%'),
    },

    // Header
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp('4%'),
      // paddingTop: hp('2%'),
      paddingBottom: hp('1%'),
    },
    storeName: {
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      letterSpacing: -0.5,
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: wp('4%'),
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 8,
      height: 8,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.backgroundColor,
    },

    // Search
    searchSection: {
      paddingHorizontal: wp('4%'),
      marginBottom: hp('1%'),
      marginTop: hp('0.5%'),
    },

    // Sections
    section: {
      marginTop: hp('1%'),
      paddingLeft: wp('4%'), // Padding for lists
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: wp('4%'),
      marginBottom: hp('1.5%'),
    },
    sectionTitle: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
    },
    seeAllText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.semiBold,
    },

    // Timer Badge (Flash sale)
    timerBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
    },
    timerText: {
      color: theme.white,
      fontSize: fontSize.f10,
      fontFamily: fontFamily.bold,
    },

    // Categories
    categoryList: {
      paddingLeft: wp('2%'),
      paddingRight: wp('4%'),
    },
  });
