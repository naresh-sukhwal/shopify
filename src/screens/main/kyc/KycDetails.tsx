import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AppBackground, StackHeader } from '@/components';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface';

export default function KycDetails() {
  const styles = useThemedStyles(createStyle);
  return (
    <AppBackground>
      <View style={styles.container}>
        <StackHeader title="Add Money" subtitle="Wallet" />
      </View>
    </AppBackground>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
