import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import * as types from '@/interface';

export default function InvestScreen() {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text>Invest Screen</Text>
    </View>
  );
}

const createStyles = (themeColor: types.themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColor.backgroundColor,
    },
  });
