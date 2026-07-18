import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Ionicons,
  Feather,
  fontFamily,
  fontSize,
} from '@/utils/fontIcon.utils';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { hp, wp } from '@/utils/responsive.utils';
import { themeType } from '@/interface';

interface SimpleHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
}

export default function SimpleHeader({
  title,
  onBackPress,
  rightIcon,
  onRightPress,
}: SimpleHeaderProps) {
  const navigation = useNavigation();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={onBackPress || (() => navigation.goBack())}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={themeColor.buttonBackground}
        />
      </TouchableOpacity>
      <Text
        style={[styles.headerTitle, { color: themeColor.buttonBackground }]}
      >
        {title}
      </Text>
      {rightIcon ? (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onRightPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather
            name={rightIcon as any}
            size={24}
            color={themeColor.buttonBackground}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.headerButton} />
      )}
    </View>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp('4%'),
      paddingBottom: hp('1.5%'),
    },
    headerButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f20,
    },
  });
