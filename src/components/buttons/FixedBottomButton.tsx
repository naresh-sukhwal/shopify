import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface';
import { fontFamily, fontSize, Feather } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';

interface FixedBottomButtonProps {
  title: string;
  onPress: () => void;
  icon?: string;
  topContent?: React.ReactNode;
  disabled?: boolean;
}

export default function FixedBottomButton({
  title,
  onPress,
  icon,
  topContent,
  disabled = false,
}: FixedBottomButtonProps) {
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bottomBar,
        {
          backgroundColor: themeColor.white,
          shadowColor: themeColor.black,
        },
      ]}
    >
      <View style={styles.contentContainer}>
        {topContent && <View style={styles.topContainer}>{topContent}</View>}

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: disabled
                ? themeColor.placeHolderColor
                : themeColor.buttonBackground,
            },
          ]}
          onPress={onPress}
          disabled={disabled}
          activeOpacity={disabled ? 1 : 0.8}
        >
          <Text style={[styles.buttonText, { color: themeColor.white }]}>
            {title}
          </Text>
          {icon && (
            <Feather name={icon as any} size={20} color={themeColor.white} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    bottomBar: {
      borderTopLeftRadius: wp('8%'),
      borderTopRightRadius: wp('8%'),
      paddingHorizontal: wp('5%'),
      paddingTop: hp('2%'),
      shadowOffset: { width: 0, height: -4 },
      paddingBottom: hp('2%'),
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    contentContainer: {
      flexDirection: 'column',
    },
    topContainer: {
      marginBottom: hp('1%'),
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: wp('8%'),
      paddingVertical: hp('2%'),
      gap: wp('2%'),
    },
    buttonText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
    },
  });
