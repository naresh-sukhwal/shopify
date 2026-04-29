import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Entypo,
  fontFamily,
  fontSize,
  MaterialDesignIcons,
} from '@/utils/fontIcon.utils';
import { fSize } from '@/utils/responsive.utils';
import { RootState, store } from '@/store';
import { themeType } from '@/interface/theme.type';

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
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
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
      fontFamily: fontFamily.montserratMedium,
      fontSize: fontSize.f16,
      color: theme.text,
    },
  });
