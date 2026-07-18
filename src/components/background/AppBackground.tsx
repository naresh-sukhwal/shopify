import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { themeType } from '@/interface';
import { ReactNode } from 'react';
import SafeAreaWrapper from '../hoc/SafeAreaWrapper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeStore } from '@/store/themeStore';
import { useMemo } from 'react';

export default function AppBackground({
  children,
  backgroundColor,
  statusBarColor,
  useTopPadding = true,
  useSafeArea = true,
  topValus = 0,
}: {
  children: ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  useTopPadding?: boolean;
  useSafeArea?: boolean;
  topValus?: number;
}) {
  const { themeColor } = useThemeStore();
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  const { top, bottom } = useSafeAreaInsets();
  return (
    <SafeAreaWrapper
      useSafeArea={false}
      StatusBarStyle="dark-content"
      statusBarColor={statusBarColor}
    >
      <View
        style={[
          styles.gradiantBackground,
          {
            paddingTop: useSafeArea
              ? useTopPadding
                ? topValus || top
                : 0
              : topValus || top,
            paddingBottom: useSafeArea ? bottom : 0,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        {children}
      </View>
    </SafeAreaWrapper>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    gradiantBackground: {
      flex: 1,
      backgroundColor: themeColor.backgroundColorS1,
    },
  });
