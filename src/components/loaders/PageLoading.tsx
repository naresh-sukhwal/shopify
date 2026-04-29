import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { height } from '@/utils/responsive.utils';
type props = {
  style?: ViewStyle;
};

export default function PageLoading({ style }: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={'large'} color={themeColor.primary} />
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: height / 1.5,
    },
  });
