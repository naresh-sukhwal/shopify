import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { fontSize } from '@/utils/fontIcon.utils';

interface props {
  errorMsg: string | undefined;
}

export default function ErrorText({errorMsg}: props) {
  const {themeColor} = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  return <Text style={styles.error}>{errorMsg}</Text>;
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    error: {
      color: theme.red,
      fontSize: fontSize.f12,
      marginLeft: 5,
      marginTop: 2,
    },
  });
