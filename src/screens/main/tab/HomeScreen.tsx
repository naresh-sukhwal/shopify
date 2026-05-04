import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import * as types from '@/interface';
import { navigate } from '@/utils/navigation.utils';
import MainHeader from '@/components/headers/MainHeader';
import { AppBackground } from '@/components';
import { useTranslation } from 'react-i18next';
import { wp, hp } from '@/utils/responsive.utils';

import { getSalutation } from '@/utils/helper.utils';

export default function HomeScreen() {
  const styles = useThemedStyles(createStyles);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MainHeader
        greeting={t(getSalutation())}
        name="Aarav"
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text
          onPress={() => navigate('MainStack', { screen: 'AddMoneyInitial' })}
        >
          Home Screen
        </Text>
      </ScrollView>
    </View>
  );
}

const createStyles = (themeColor: types.themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColor.backgroundColor,
    },
    scrollContent: {
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('2%'),
    },
  });
