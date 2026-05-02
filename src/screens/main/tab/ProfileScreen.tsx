import { StyleSheet, Text, View } from 'react-native';
import * as types from '@/interface';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import React from 'react';

export default function ProfileScreen() {
  const styles = useThemedStyles(createStyles);
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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
