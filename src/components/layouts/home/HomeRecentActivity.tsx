import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface/theme.type';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { recentActivityData } from '@/utils/contant.utils';

const HomeRecentActivity: React.FC = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.recent_activity')}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>{t('home.view_all')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {recentActivityData.map((item) => (
          <View key={item.id} style={styles.activityCard}>
            <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
              <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
            </View>
            <View style={styles.info}>
              <Text style={styles.activityTitle}>{t(item.title)}</Text>
              <Text style={styles.activitySubtitle}>{t(item.subtitle)}</Text>
            </View>
            <View style={styles.amountInfo}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      marginTop: 32,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    viewAll: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textDecorationLine: 'underline',
    },
    list: {
      gap: 12,
    },
    activityCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 1,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    info: {
      flex: 1,
    },
    activityTitle: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginBottom: 2,
    },
    activitySubtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    amountInfo: {
      alignItems: 'flex-end',
    },
    amount: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginBottom: 2,
    },
    time: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
  });

export default HomeRecentActivity;
