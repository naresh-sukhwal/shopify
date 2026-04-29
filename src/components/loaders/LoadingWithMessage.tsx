import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { height, width } from '@/utils/responsive.utils';

type props = {
  style?: ViewStyle;
  msg?: string;
};

export default function LoadingWithMessage({ style, msg = '' }: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  return (
    <View style={[styles.container, style]}>
      <View style={styles.subContainer}>
        <ActivityIndicator size={'large'} color={themeColor.primary} />
        <Text>{msg}</Text>
      </View>
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      height: Platform.OS == 'android' ? height : height,
      width: width,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      backgroundColor: 'rgba(0,0,0,0.5)',
      position: 'absolute',
    },
    subContainer: {
      backgroundColor: theme.white,
      minWidth: '60%',
      maxWidth: '90%',
      minHeight: 120,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 10,
      zIndex: 99999,
    },
  });
