import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as types from '@/interface';
import { useThemedStyles } from '@/hooks/useThemedStyles';

export default function RewardScreen() {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text>Reward Screen</Text>
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
