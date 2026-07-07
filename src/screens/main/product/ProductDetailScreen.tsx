import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useToastMessage } from '@/hooks/useToastMessage';
import { useCartStore } from '@/store/cartStore';
import { addCartLines, createCart, getProductByHandle } from '@/api';
import { fontSize, fontFamily, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';
import type { Product, ProductVariant } from '@/types/app.types';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaWrapper from '@/components/hoc/SafeAreaWrapper';
import FavoriteButton from '@/components/buttons/FavoriteButton';
import Price from '@/components/common/Price';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLOR_MAP: Record<string, string> = {
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF3B30',
  blue: '#007AFF',
  green: '#34C759',
  yellow: '#FFCC00',
  orange: '#FF9500',
  purple: '#AF52DE',
  pink: '#FF2D55',
  gray: '#8E8E93',
  grey: '#8E8E93',
  cream: '#FFFDD0',
  beige: '#F5F5DC',
  olive: '#808000',
  navy: '#000080',
  brown: '#A52A2A',
  silver: '#C0C0C0',
  gold: '#FFD700',
  charcoal: '#36454F',
  ivory: '#FFFFF0',
  sand: '#C2B280',
  khaki: '#C3B091',
  taupe: '#483C32',
  teal: '#008080',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
};

const getHexColor = (colorName: string): string => {
  const lower = colorName.toLowerCase().trim();
  if (lower.startsWith('#') || lower.startsWith('rgb')) {
    return lower;
  }
  return COLOR_MAP[lower] || '#D3D3D3';
};

interface AccordionProps {
  title: string;
  content: string;
  themeColor: any;
  styles: any;
}

const AccordionItem = ({
  title,
  content,
  themeColor,
  styles,
}: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={[styles.accordionTitle, { color: themeColor.text }]}>
          {title}
        </Text>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={themeColor.text}
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.accordionContent}>
          <Text style={[styles.accordionText, { color: themeColor.textS1 }]}>
            {content}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function ProductDetailScreen() {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyle);
  const toast = useToastMessage();
  const { cartId, setCart } = useCartStore();

  const initialProduct = route.params?.product as Product;
  const [product, setProduct] = useState<Product | null>(
    initialProduct || null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFullDetails = async () => {
      if (!initialProduct?.handle) return;
      setLoading(true);
      try {
        const fullProduct = await getProductByHandle(initialProduct.handle);
        if (fullProduct) {
          setProduct(fullProduct);
        }
      } catch (error) {
        console.log('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFullDetails();
  }, [initialProduct?.handle]);

  // Find color and size options
  const colorOption = product?.options?.find(
    opt =>
      opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'colors',
  );
  const sizeOption = product?.options?.find(
    opt =>
      opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'sizes',
  );

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      const colorOpt = product.options.find(
        opt =>
          opt.name.toLowerCase() === 'color' ||
          opt.name.toLowerCase() === 'colors',
      );
      if (colorOpt && !selectedColor) {
        setSelectedColor(colorOpt.values[0]);
      }
      const sizeOpt = product.options.find(
        opt =>
          opt.name.toLowerCase() === 'size' ||
          opt.name.toLowerCase() === 'sizes',
      );
      if (sizeOpt && !selectedSize) {
        setSelectedSize(sizeOpt.values[0]);
      }
    }
  }, [product]);

  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [isDescExpanded, setIsDescExpanded] = useState<boolean>(false);

  const flatListRef = useRef<FlatList>(null);

  if (loading && !product) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={themeColor.buttonBackground} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: themeColor.text }}>
          {t('home.no_products', 'Product not found')}
        </Text>
      </View>
    );
  }

  // Find matching variant based on selections
  const activeVariant =
    product.variants.find(variant => {
      const isColorMatch = colorOption
        ? variant.selectedOptions.some(
            opt =>
              (opt.name.toLowerCase() === 'color' ||
                opt.name.toLowerCase() === 'colors') &&
              opt.value === selectedColor,
          )
        : true;
      const isSizeMatch = sizeOption
        ? variant.selectedOptions.some(
            opt =>
              (opt.name.toLowerCase() === 'size' ||
                opt.name.toLowerCase() === 'sizes') &&
              opt.value === selectedSize,
          )
        : true;
      return isColorMatch && isSizeMatch;
    }) || product.variants[0];

  // Scroll to matching variant image when selectedColor changes
  useEffect(() => {
    if (activeVariant?.image && product.images?.length > 0) {
      const imgIndex = product.images.findIndex(
        img => img.url === activeVariant.image?.url,
      );
      if (imgIndex !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: imgIndex, animated: true });
        setCurrentImageIndex(imgIndex);
      }
    }
  }, [selectedColor]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${product.title} - Check this out on Stylo!`,
        url: product.handle
          ? `https://stylo.shop/products/${product.handle}`
          : undefined,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!activeVariant) return;
    setIsAdding(true);
    try {
      let currentCartId = cartId;
      if (!currentCartId) {
        const newCart = await createCart([
          { merchandiseId: activeVariant.id, quantity },
        ]);
        setCart(newCart);
      } else {
        const updatedCart = await addCartLines(currentCartId, [
          { merchandiseId: activeVariant.id, quantity },
        ]);
        setCart(updatedCart);
      }
      toast.showSuccess(t('product.added_to_cart', 'Product added to cart!'));
    } catch (error) {
      console.error(error);
      toast.showError(t('product.failed_add_cart', 'Failed to add to cart'));
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (!activeVariant) return;
    setIsBuying(true);
    try {
      let currentCartId = cartId;
      let checkoutUrl = '';
      if (!currentCartId) {
        const newCart = await createCart([
          { merchandiseId: activeVariant.id, quantity },
        ]);
        setCart(newCart);
        checkoutUrl = newCart.checkoutUrl;
      } else {
        const updatedCart = await addCartLines(currentCartId, [
          { merchandiseId: activeVariant.id, quantity },
        ]);
        setCart(updatedCart);
        checkoutUrl = updatedCart.checkoutUrl;
      }
      // Open Checkout URL or navigate
      toast.showSuccess(t('product.redirecting', 'Redirecting to checkout...'));
      console.log('Checkout URL:', checkoutUrl);
    } catch (error) {
      console.error(error);
      toast.showError(t('product.failed_checkout', 'Checkout failed'));
    } finally {
      setIsBuying(false);
    }
  };

  const onScroll = useCallback((event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentImageIndex(roundIndex);
  }, []);

  const getItemLayout = (data: any, index: number) => ({
    length: SCREEN_WIDTH,
    offset: SCREEN_WIDTH * index,
    index,
  });

  const renderImageItem = ({ item }: { item: { url: string } }) => (
    <FastImage
      source={{ uri: item.url }}
      style={styles.imageSlide}
      resizeMode={FastImage.resizeMode.cover}
    />
  );

  const images =
    product.images.length > 0
      ? product.images
      : product.featuredImage
      ? [product.featuredImage]
      : [];

  // Format price
  const displayPrice = activeVariant?.price
    ? activeVariant.price.amount
    : product.minPrice.amount;
  const comparePrice = activeVariant?.compareAtPrice
    ? activeVariant.compareAtPrice.amount
    : product.compareAtMinPrice
    ? product.compareAtMinPrice.amount
    : null;
  const currencyCode = activeVariant?.price
    ? activeVariant.price.currencyCode
    : product.minPrice.currencyCode;
  const currencySymbol = currencyCode === 'USD' ? '$' : currencyCode;

  // Calculate discount percentage locally if not already set
  let discountPercent = product.discountPercentage;
  if (comparePrice && comparePrice > displayPrice) {
    discountPercent = Math.round(
      ((comparePrice - displayPrice) / comparePrice) * 100,
    );
  }

  // Collapsible Static Contents
  const materialsText =
    'This premium piece is crafted from a high-quality blend of 70% organic cotton and 30% sustainably sourced merino wool, ensuring both comfort and durability.';
  const careText =
    'To maintain the quality, machine wash cold on a gentle cycle with like colors. Do not bleach. Lay flat to dry or tumble dry low. Cool iron if needed.';
  const shippingText =
    'Enjoy free standard shipping on orders over $100. Standard delivery takes 3-5 business days. Easy returns and exchanges within 30 days of purchase.';

  return (
    <SafeAreaWrapper
      useSafeArea={false}
      statusBarColor="transparent"
      StatusBarStyle="dark-content"
    >
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* --- Image Carousel --- */}
          <View style={styles.imageContainer}>
            {images.length > 0 ? (
              <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderImageItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                getItemLayout={getItemLayout}
              />
            ) : (
              <View style={[styles.imageSlide, styles.imagePlaceholder]} />
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
              <View style={styles.dotsContainer}>
                {images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentImageIndex === index
                        ? styles.activeDot
                        : styles.inactiveDot,
                      currentImageIndex === index && {
                        backgroundColor: themeColor.buttonBackground,
                      },
                    ]}
                  />
                ))}
              </View>
            )}

            {/* Overlay Buttons */}
            <View style={styles.headerOverlay}>
              <TouchableOpacity
                style={[
                  styles.headerButton,
                  { backgroundColor: themeColor.white },
                ]}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={20} color={themeColor.text} />
              </TouchableOpacity>

              <View style={styles.headerRightGroup}>
                <TouchableOpacity
                  style={[
                    styles.headerButton,
                    {
                      backgroundColor: themeColor.white,
                      marginRight: wp('3%'),
                    },
                  ]}
                  onPress={handleShare}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="share-social-outline"
                    size={20}
                    color={themeColor.text}
                  />
                </TouchableOpacity>
                <FavoriteButton
                  selected={isFavorite}
                  onPress={() => setIsFavorite(!isFavorite)}
                  size={20}
                  style={StyleSheet.flatten([
                    styles.headerButton,
                    { width: 36, height: 36, padding: 0 },
                  ])}
                />
              </View>
            </View>
          </View>

          {/* --- Product Details Section --- */}
          <View
            style={[styles.detailsCard, { backgroundColor: themeColor.white }]}
          >
            {/* Subtitle / Vendor */}
            <Text
              style={[
                styles.vendorText,
                { color: themeColor.buttonBackground },
              ]}
            >
              {product.vendor
                ? product.vendor.toUpperCase()
                : t('home.stylo_collection', 'STYLO COLLECTION')}
            </Text>

            {/* Title */}
            <Text style={[styles.productTitle, { color: themeColor.text }]}>
              {product.title}
            </Text>

            {/* Price Layout */}
            <View style={styles.priceRow}>
              <Price
                price={displayPrice}
                oldPrice={
                  comparePrice && comparePrice > displayPrice
                    ? comparePrice
                    : undefined
                }
                currency={currencySymbol}
                discount={
                  discountPercent && discountPercent > 0
                    ? discountPercent
                    : undefined
                }
                size="large"
              />
            </View>

            {/* Color Selector */}
            {colorOption && (
              <View style={styles.optionContainer}>
                <Text style={[styles.optionLabel, { color: themeColor.text }]}>
                  {t('product.color', 'Color')}
                </Text>
                <View style={styles.colorList}>
                  {colorOption.values.map(color => {
                    const isSelected = selectedColor === color;
                    return (
                      <TouchableOpacity
                        key={color}
                        style={[
                          styles.colorOutline,
                          isSelected && {
                            borderColor: themeColor.buttonBackground,
                          },
                        ]}
                        onPress={() => setSelectedColor(color)}
                        activeOpacity={0.8}
                      >
                        <View
                          style={[
                            styles.colorSwatch,
                            { backgroundColor: getHexColor(color) },
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Size Selector */}
            {sizeOption && (
              <View style={styles.optionContainer}>
                <View style={styles.optionHeaderRow}>
                  <Text
                    style={[styles.optionLabel, { color: themeColor.text }]}
                  >
                    {t('product.select_size', 'Select Size')}
                  </Text>
                  {/* <TouchableOpacity
                  onPress={() =>
                    toast.showInfo(t('product.size_guide', 'Size Guide'))
                  }
                >
                  <Text
                    style={[
                      styles.sizeGuideLink,
                      { color: themeColor.buttonBackground },
                    ]}
                  >
                    {t('product.size_guide', 'Size Guide')}
                  </Text>
                </TouchableOpacity> */}
                </View>

                <View style={styles.sizeList}>
                  {sizeOption.values.map(size => {
                    const isSelected = selectedSize === size;
                    return (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.sizeBox,
                          {
                            borderColor: isSelected
                              ? themeColor.buttonBackground
                              : themeColor.borderColor,
                          },
                          isSelected && {
                            backgroundColor: themeColor.primaryS1,
                          },
                        ]}
                        onPress={() => setSelectedSize(size)}
                        activeOpacity={0.8}
                      >
                        <Text
                          style={[
                            styles.sizeText,
                            {
                              color: isSelected
                                ? themeColor.buttonBackground
                                : themeColor.text,
                              fontFamily: isSelected
                                ? fontFamily.bold
                                : fontFamily.regular,
                            },
                          ]}
                        >
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Quantity Selector */}
            <View style={styles.optionContainer}>
              <Text style={[styles.optionLabel, { color: themeColor.text }]}>
                {t('product.quantity', 'Quantity')}
              </Text>
              <View
                style={[
                  styles.quantitySelector,
                  { backgroundColor: themeColor.grayS3 },
                ]}
              >
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  <Ionicons name="remove" size={16} color={themeColor.text} />
                </TouchableOpacity>
                <Text style={[styles.qtyValue, { color: themeColor.text }]}>
                  {quantity}
                </Text>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => setQuantity(q => q + 1)}
                >
                  <Ionicons name="add" size={16} color={themeColor.text} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Description Section */}
            {product.description ? (
              <View style={styles.descriptionSection}>
                <Text
                  style={[styles.sectionHeading, { color: themeColor.text }]}
                >
                  {t('product.description', 'Description')}
                </Text>
                <Text
                  style={[styles.descriptionText, { color: themeColor.textS1 }]}
                  numberOfLines={isDescExpanded ? undefined : 3}
                >
                  {product.description}
                </Text>
                {product.description.length > 120 && (
                  <TouchableOpacity
                    onPress={() => setIsDescExpanded(!isDescExpanded)}
                  >
                    <Text
                      style={[
                        styles.readMoreText,
                        { color: themeColor.buttonBackground },
                      ]}
                    >
                      {isDescExpanded
                        ? t('product.read_less', 'Read less')
                        : t('product.read_more', 'Read more')}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}

            {/* Accordion Expandables */}
            <View style={styles.accordionSection}>
              <AccordionItem
                title={t('product.materials', 'Materials')}
                content={materialsText}
                themeColor={themeColor}
                styles={styles}
              />
              <AccordionItem
                title={t('product.care', 'Care')}
                content={careText}
                themeColor={themeColor}
                styles={styles}
              />
              <AccordionItem
                title={t('product.shipping_returns', 'Shipping & Returns')}
                content={shippingText}
                themeColor={themeColor}
                styles={styles}
              />
            </View>
          </View>
        </ScrollView>

        {/* --- Bottom Action Buttons Bar --- */}
        <SafeAreaView
          edges={['bottom']}
          style={[
            styles.bottomBarContainer,
            {
              backgroundColor: themeColor.backgroundColorS1,
              borderTopColor: themeColor.grayS2,
            },
          ]}
        >
          <View
            style={[
              styles.bottomBar,
              {
                backgroundColor: themeColor.white,
              },
            ]}
          >
            <TouchableOpacity
              style={[
                styles.btnOutline,
                { borderColor: themeColor.buttonBackground },
              ]}
              onPress={handleAddToCart}
              disabled={isAdding}
              activeOpacity={0.8}
            >
              {isAdding ? (
                <ActivityIndicator
                  size="small"
                  color={themeColor.buttonBackground}
                />
              ) : (
                <Text
                  style={[
                    styles.btnOutlineText,
                    { color: themeColor.buttonBackground },
                  ]}
                >
                  {t('home.add_to_cart', 'Add to Cart')}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btnFilled,
                { backgroundColor: themeColor.buttonBackground },
              ]}
              onPress={handleBuyNow}
              disabled={isBuying}
              activeOpacity={0.8}
            >
              {isBuying ? (
                <ActivityIndicator size="small" color={themeColor.white} />
              ) : (
                <Text
                  style={[styles.btnFilledText, { color: themeColor.white }]}
                >
                  {t('product.buy_now', 'Buy Now')}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaWrapper>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primary,
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollContent: {},
    imageContainer: {
      position: 'relative',
      width: SCREEN_WIDTH,
      height: hp('45%'),
    },
    imageSlide: {
      width: SCREEN_WIDTH,
      height: hp('45%'),
    },
    imagePlaceholder: {
      backgroundColor: theme.grayS2,
    },
    dotsContainer: {
      position: 'absolute',
      bottom: hp('2.5%'),
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      height: 6,
      borderRadius: 3,
      marginHorizontal: 3,
    },
    activeDot: {
      width: 16,
    },
    inactiveDot: {
      width: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    headerOverlay: {
      position: 'absolute',
      top: hp('6%'),
      left: wp('4%'),
      right: wp('4%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerRightGroup: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 3,
    },
    detailsCard: {
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      marginTop: -hp('3.5%'),
      paddingHorizontal: wp('5%'),
      paddingTop: hp('3%'),
      paddingBottom: hp('4%'),
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: -3 },
      shadowRadius: 6,
      elevation: 2,
    },
    vendorText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      letterSpacing: 1,
      marginBottom: 6,
    },
    productTitle: {
      fontSize: fontSize.f22,
      fontFamily: fontFamily.bold,
      lineHeight: fontSize.f22 * 1.25,
      marginBottom: hp('1%'),
    },
    priceRow: {
      marginBottom: hp('2%'),
    },
    optionContainer: {
      marginTop: hp('2%'),
    },
    optionHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp('0.5%'),
    },
    optionLabel: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      marginBottom: hp('1%'),
    },
    colorList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 2,
    },
    colorOutline: {
      width: 38,
      height: 38,
      borderRadius: 19,
      borderWidth: 1.5,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: wp('3%'),
      marginBottom: hp('1%'),
    },
    colorSwatch: {
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 0.5,
      borderColor: '#E5E5E5',
    },
    sizeList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 2,
    },
    sizeBox: {
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('1.2%'),
      marginRight: wp('2.5%'),
      marginBottom: hp('1%'),
      minWidth: wp('14%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    sizeText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
    },
    sizeGuideLink: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      textDecorationLine: 'underline',
    },
    quantitySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: 20,
      paddingVertical: hp('0.6%'),
      paddingHorizontal: wp('2%'),
      marginTop: 2,
    },
    qtyBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    qtyValue: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      paddingHorizontal: wp('4%'),
      textAlign: 'center',
    },
    descriptionSection: {
      marginTop: hp('3%'),
      marginRight: wp('1%'),
    },
    sectionHeading: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      marginBottom: hp('1%'),
    },
    descriptionText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.regular,
      lineHeight: fontSize.f14 * 1.5,
    },
    readMoreText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.bold,
      marginTop: hp('0.5%'),
    },
    accordionSection: {
      marginTop: hp('3%'),
      borderTopWidth: 1,
      borderTopColor: theme.borderColor,
    },
    accordionContainer: {
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    accordionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: hp('2%'),
    },
    accordionTitle: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },
    accordionContent: {
      paddingBottom: hp('2%'),
      paddingHorizontal: wp('1%'),
    },
    accordionText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.regular,
      lineHeight: fontSize.f13 * 1.5,
    },
    bottomBarContainer: {
      borderTopWidth: 1,
      backgroundColor: theme.white,
      paddingTop: 20, // 20px gap from ScrollView top
    },
    bottomBar: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('1.5%'),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    btnOutline: {
      flex: 1,
      height: hp('6%'),
      borderRadius: hp('6%') / 2,
      borderWidth: 1.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: wp('3%'),
    },
    btnOutlineText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f15,
    },
    btnFilled: {
      flex: 1.2,
      height: hp('6%'),
      borderRadius: hp('6%') / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnFilledText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f15,
    },
  });
