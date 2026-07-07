import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fontSize, fontFamily, Ionicons } from '@/utils/fontIcon.utils';
import { wp, hp } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CategoryCardProps {
  title: string;
  image: string;
  onPress: () => void;
  /** Optional: override card width (defaults to half-screen 2-column layout) */
  cardWidth?: number;
  /** Optional: override card height */
  cardHeight?: number;
}

export default function CategoryCard({
  title,
  image,
  onPress,
  cardWidth,
  cardHeight,
}: CategoryCardProps) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  const resolvedWidth = cardWidth ?? (SCREEN_WIDTH - wp('4%') * 3) / 2;
  const resolvedHeight = cardHeight ?? hp('20%');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.card,
        { width: resolvedWidth, height: resolvedHeight },
      ]}
      accessibilityLabel={title}
      accessibilityRole="button"
    >
      {/* Background Image */}
      <FastImage
        source={{ uri: image }}
        style={StyleSheet.absoluteFillObject}
        resizeMode={FastImage.resizeMode.cover}
      />

      {/* Dark Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.18)', 'rgba(0,0,0,0.65)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Bottom Row: Name + Arrow button */}
      <View style={styles.bottomRow}>
        <Text style={styles.categoryName} numberOfLines={2}>
          {title}
        </Text>

        <View
          style={[
            styles.arrowButton,
            { backgroundColor: themeColor.buttonBackground },
          ]}
        >
          <Ionicons name="arrow-forward" size={16} color={themeColor.white} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyle = (_theme: themeType) =>
  StyleSheet.create({
    card: {
      borderRadius: wp('3%'),
      overflow: 'hidden',
      backgroundColor: '#1a1a1a',
    },
    bottomRow: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingHorizontal: wp('3%'),
      paddingBottom: hp('1.2%'),
      paddingTop: hp('2%'),
    },
    categoryName: {
      flex: 1,
      color: '#FFFFFF',
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
      marginRight: wp('2%'),
      lineHeight: fontSize.f14 * 1.3,
    },
    arrowButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
