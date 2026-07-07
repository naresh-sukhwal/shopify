import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fontSize, fontFamily } from '@/utils/fontIcon.utils';
import { wp, hp } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';

interface CategoryChipProps {
  title: string;
  image: string;
  selected?: boolean;
  onPress: () => void;
}

export default function CategoryChip({
  title,
  image,
  selected = false,
  onPress,
}: CategoryChipProps) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.container}
    >
      <View
        style={[
          styles.imageContainer,
          { borderWidth: 2, borderColor: 'transparent' },
          selected && {
            borderColor: themeColor.buttonBackground,
          },
        ]}
      >
        <FastImage
          source={{ uri: image }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <Text
        style={[styles.title, { color: themeColor.text }]}
        numberOfLines={1}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginRight: wp('7%'),
      width: wp('16%'),
    },
    imageContainer: {
      width: wp('18%'),
      height: wp('18%'),
      borderRadius: wp('9%'),
      overflow: 'hidden',
      backgroundColor: theme.grayS2,
      marginBottom: hp('1%'),
    },
    image: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      textAlign: 'center',
    },
  });
