import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';

type props = {
  loading: boolean;
};

export default function FooterLoading({ loading }: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  if (!loading) return null;
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
      }}
    >
      <ActivityIndicator size={'small'} color={themeColor.primary} />
    </View>
  );
}

const createStyle = (theme: themeType) => StyleSheet.create({});
