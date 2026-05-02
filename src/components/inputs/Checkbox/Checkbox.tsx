import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  fontFamily,
  fontSize,
  MaterialDesignIcons,
} from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { store } from '@/store';

type props = {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  checkboxStyle?: TextStyle;
};

export default function Checkbox({
  value = false,
  onChange,
  label = '',
  activeColor = store.getState().ThemeManager.themeColor.primary,
  inactiveColor = store.getState().ThemeManager.themeColor.gray,
  containerStyle,
  checkboxStyle,
  labelStyle,
}: props) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  return (
    <View style={[styles.container, containerStyle]}>
      <MaterialDesignIcons
        name={value ? 'checkbox-marked' : 'checkbox-blank-outline'}
        size={30}
        color={value ? activeColor : inactiveColor}
        onPress={() => onChange(!value)}
        style={[checkboxStyle]}
      />
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    label: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f16,
      color: theme.text,
    },
  });
