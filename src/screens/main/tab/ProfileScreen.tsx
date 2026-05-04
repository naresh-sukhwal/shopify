import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as types from '@/interface';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import React from 'react';
import MainHeader from '@/components/headers/MainHeader';
import { AppBackground } from '@/components';
import { useTranslation } from 'react-i18next';
import { wp, hp } from '@/utils/responsive.utils';

export default function ProfileScreen() {
  const styles = useThemedStyles(createStyles);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MainHeader
        greeting={t('profile.header_title', { defaultValue: 'My Profile' })}
        name="Aarav"
        showUserIcon={false}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text>Profile Screen</Text>
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
