import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { themeType } from '@/interface';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import type { CartItem } from '@/types/app.types';
import Price from '../common/Price';

interface CartItemCardProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  const merchandise = item.merchandise;
  const image = merchandise.image?.url;
  
  // Format options
  const options = merchandise.selectedOptions || [];
  let optionText = '';
  if (options.length > 0) {
    optionText = options.map(opt => `${opt.name}: ${opt.value}`).join('   ');
  }

  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { backgroundColor: themeColor.backgroundColorS1 }]}>
        {image ? (
          <FastImage
            source={{ uri: image }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.topRow}>
          <Text style={[styles.title, { color: themeColor.text }]} numberOfLines={1}>
            {merchandise.productTitle}
          </Text>
          <TouchableOpacity onPress={onRemove} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Ionicons name="trash-outline" size={18} color={themeColor.textS1} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.options, { color: themeColor.textS1 }]} numberOfLines={1}>
          {optionText}
        </Text>

        <View style={styles.bottomRow}>
          <View style={[styles.stepperContainer, { backgroundColor: themeColor.backgroundColorS1 }]}>
            <TouchableOpacity onPress={onDecrease} style={styles.stepperButton}>
              <Text style={[styles.stepperAction, { color: themeColor.buttonBackground }]}>−</Text>
            </TouchableOpacity>
            
            <Text style={[styles.stepperValue, { color: themeColor.text }]}>{item.quantity}</Text>
            
            <TouchableOpacity onPress={onIncrease} style={styles.stepperButton}>
              <Text style={[styles.stepperAction, { color: themeColor.buttonBackground }]}>+</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Price price={merchandise.price.amount} currency={merchandise.price.currencyCode} />
          </View>
        </View>
      </View>
    </View>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: hp('2%'),
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    imageContainer: {
      width: wp('22%'),
      height: wp('22%'),
      borderRadius: wp('3%'),
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    imagePlaceholder: {
      width: '100%',
      height: '100%',
    },
    detailsContainer: {
      flex: 1,
      marginLeft: wp('4%'),
      justifyContent: 'space-between',
    },
    topRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    title: {
      flex: 1,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f15,
      marginRight: wp('2%'),
    },
    options: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f13,
      marginTop: hp('0.5%'),
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: hp('1.5%'),
    },
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: wp('4%'),
      paddingHorizontal: wp('2%'),
      height: hp('3.5%'),
    },
    stepperButton: {
      paddingHorizontal: wp('2.5%'),
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    stepperAction: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.medium,
    },
    stepperValue: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      minWidth: wp('4%'),
      textAlign: 'center',
    },
    price: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f15,
    },
  });
