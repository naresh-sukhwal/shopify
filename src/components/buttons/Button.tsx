import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
import { hp, wp } from '@/utils/responsive.utils';

export interface ButtonProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  title,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  variant = 'primary',
  onPress,
  style,
  textStyle,
}: ButtonProps) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          container: [styles.containerOutline, { borderColor: themeColor.buttonBackground }],
          text: [styles.textOutline, { color: themeColor.buttonBackground }],
        };
      case 'secondary':
        return {
          container: [styles.containerSecondary, { backgroundColor: themeColor.primary }],
          text: [styles.textSecondary, { color: themeColor.buttonBackground }],
        };
      case 'ghost':
        return {
          container: styles.containerGhost,
          text: [styles.textGhost, { color: themeColor.buttonBackground }],
        };
      case 'primary':
      default:
        return {
          container: [styles.containerPrimary, { backgroundColor: themeColor.buttonBackground }],
          text: [styles.textPrimary, { color: themeColor.white }],
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.baseContainer,
        variantStyles.container,
        disabled && styles.disabledContainer,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'primary' ? themeColor.white : themeColor.buttonBackground
          }
        />
      ) : (
        <View style={styles.contentRow}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              variantStyles.text,
              disabled && { color: themeColor.grayS1 },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    baseContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingVertical: hp('1.5%'),
      paddingHorizontal: wp('5%'),
    },
    disabledContainer: {
      opacity: 0.6,
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    leftIcon: {
      marginRight: wp('2%'),
    },
    rightIcon: {
      marginLeft: wp('2%'),
    },
    
    // Primary
    containerPrimary: {},
    textPrimary: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },

    // Secondary
    containerSecondary: {},
    textSecondary: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },

    // Outline
    containerOutline: {
      borderWidth: 1.5,
      backgroundColor: 'transparent',
    },
    textOutline: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },

    // Ghost
    containerGhost: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
    },
    textGhost: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },
  });
