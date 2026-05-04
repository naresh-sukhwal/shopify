import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface/theme.type';
import {
  fontFamily,
  fontSize,
  Ionicons,
  MaterialDesignIcons,
  Feather,
} from '@/utils/fontIcon.utils';
import { SVG } from '@/assets';
import { useThemeColor } from '@/hooks/useThemeColor';

const HomeStatsRow: React.FC = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      {/* Wallet Balance Card */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.label}>{t('home.wallet_balance')}</Text>
          <View style={[styles.iconCircle, { backgroundColor: '#FCD34D' }]}>
            <Ionicons name="wallet-outline" size={18} color="#000" />
          </View>
        </View>
        <Text style={styles.value}>₹ 12,480</Text>
        <View style={styles.divider} />
        <View style={styles.breakdown}>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{t('home.locked')}</Text>
            <Text style={styles.breakdownValue}>₹ 100</Text>
          </View>
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>{t('home.available')}</Text>
            <Text style={styles.breakdownValue}>₹ 12,380</Text>
          </View>
        </View>
      </View>

      {/* Weekly Interest Card */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.label}>{t('home.weekly_interest')}</Text>
          <View
            style={[styles.iconCircle, { backgroundColor: themeColor.greenS1 }]}
          >
            <SVG.MagicIcon />
          </View>
        </View>
        <Text style={styles.value}>₹ 186.40</Text>
        <Text style={styles.footerText}>{t('home.auto_credited_monday')}</Text>
        <View style={styles.interestBadge}>
          <Text style={styles.badgeText}>
            {t('home.next_credit_in', { days: 3 })}
          </Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 12,
    },
    card: {
      flex: 1,
      backgroundColor: theme.white,
      borderRadius: 28,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
      minHeight: 180,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    label: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      flex: 1,
    },
    iconCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      fontSize: fontSize.f22,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginBottom: 8,
    },
    divider: {
      height: 1,
      backgroundColor: '#F1F5F9',
      marginVertical: 12,
    },
    breakdown: {
      gap: 6,
    },
    breakdownRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    breakdownLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    breakdownValue: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    footerText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      lineHeight: 18,
      marginBottom: 12,
    },
    interestBadge: {
      backgroundColor: theme.greenS1,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 12,
      alignSelf: 'flex-start',
    },
    badgeText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.greenS2,
    },
  });

export default HomeStatsRow;
