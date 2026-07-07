import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface/theme.type';
import { wp, hp } from '@/utils/responsive.utils';
import type { Product } from '@/types/app.types';
import ProductCard from '../cards/ProductCard';
import SectionHeader from '../headers/SectionHeader';

interface HorizontalProductListProps {
  title: string;
  products: Product[];
  showSeeAll?: boolean;
  onSeeAll?: () => void;
  titleBadge?: React.ReactNode;

  // ProductCard config
  showWishlist?: boolean;
  showRating?: boolean;
  showDiscount?: boolean;
  showOldPrice?: boolean;
  getIsFavorite?: (product: Product) => boolean;
  getBadgeText?: (product: Product, index: number) => string | undefined;
  getCartIcon?: (product: Product) => React.ReactNode | undefined;
  onProductPress: (product: Product) => void;
  onWishlistPress?: (product: Product) => void;
  onCartPress?: (product: Product) => void;
  cardWidth?: number;
  onEndReached?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SPACING = wp('4%');
const DEFAULT_CARD_WIDTH = (SCREEN_WIDTH - SPACING * 3) / 2;

export default function HorizontalProductList({
  title,
  products,
  showSeeAll = true,
  onSeeAll,
  titleBadge,

  showWishlist = true,
  showRating = false,
  showDiscount = true,
  showOldPrice = true,
  getIsFavorite,
  getBadgeText,
  getCartIcon,
  onProductPress,
  onWishlistPress,
  onCartPress,
  cardWidth = DEFAULT_CARD_WIDTH,
  onEndReached,
}: HorizontalProductListProps) {
  const styles = useThemedStyles(createStyle);

  const renderItem = ({ item, index }: { item: Product; index: number }) => {
    return (
      <View style={styles.cardWrapper}>
        <ProductCard
          item={item}
          showWishlist={showWishlist}
          showRating={showRating}
          showDiscount={showDiscount}
          showOldPrice={showOldPrice}
          isFavorite={getIsFavorite ? getIsFavorite(item) : false}
          badgeText={getBadgeText ? getBadgeText(item, index) : undefined}
          cartIcon={getCartIcon ? getCartIcon(item) : undefined}
          onPress={onProductPress}
          onWishlist={onWishlistPress}
          onCartPress={onCartPress}
          cardWidth={cardWidth}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        title={title}
        showSeeAll={showSeeAll}
        onPressSeeAll={onSeeAll}
        titleBadge={titleBadge}
      />
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
        snapToInterval={cardWidth + SPACING}
        snapToAlignment="start"
        decelerationRate="fast"
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      marginTop: hp('2.5%'),
    },
    listContent: {
      paddingLeft: wp('4%'),
      paddingRight: wp('4%'), // Extra padding at the end of scroll
    },
    cardWrapper: {
      marginRight: wp('4%'),
    },
  });
