import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface/theme.type';
import { fontFamily, fontSize, Ionicons, MaterialIcons } from '@/utils/fontIcon.utils';
import { wp, hp } from '@/utils/responsive.utils';
import CardImageComponent from '../common/CardImageComponent';

const HomeGoldCard: React.FC = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  return (
    <CardImageComponent style={styles.cardContainer}>
      <View style={styles.topSection}>
        <View style={styles.mainInfo}>
          <Text style={styles.label}>{t('home.total_gold_value')}</Text>
          <View style={styles.valueRow}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.value}>48,620</Text>
            <Text style={styles.weight}>7.842 g</Text>
          </View>
        </View>
        <View style={styles.iconCircle}>
          <Ionicons name="link" size={24} color="#000" />
        </View>
      </View>

      <View style={styles.badgeRow}>
        <View style={styles.statusBadge}>
          <Ionicons name="trending-up" size={16} color="#10B981" />
          <Text style={styles.statusText}>+1.24% today</Text>
        </View>
        <View style={styles.dot} />
        <Text style={styles.marketText}>{t('home.market_open')}</Text>
      </View>

      <View style={styles.priceCard}>
        <View style={styles.priceIconBox}>
          <MaterialIcons name="show-chart" size={20} color="#000" />
        </View>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>{t('home.live_gold_price')}</Text>
          <Text style={styles.priceValue}>
            ₹ 6,201 <Text style={styles.priceUnit}>/ g</Text>
          </Text>
        </View>
        <View style={styles.updateInfo}>
          <Text style={styles.updateLabel}>{t('home.updated', { defaultValue: 'Updated' })}</Text>
          <Text style={styles.updateTime}>{t('home.just_now', { defaultValue: 'just now' })}</Text>
        </View>
      </View>

    </CardImageComponent>
  );
};

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    cardContainer: {
      padding: 20,
      marginTop: 20,
      minHeight: 220,
      justifyContent: 'space-between',
      backgroundColor: '#FEF9E7', // Light yellow base
    },
    topSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    mainInfo: {
      flex: 1,
    },
    label: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 6,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    currencySymbol: {
      fontSize: fontSize.f20,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginRight: 4,
    },
    value: {
      fontSize: fontSize.f32,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginRight: 8,
    },
    weight: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.semiBold,
      color: theme.secondaryS2,
    },
    iconCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#EAB308', // Solid yellow
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 24,
      alignSelf: 'flex-start',
      marginTop: 12,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: '#10B981',
      marginLeft: 4,
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.secondaryS2,
      marginHorizontal: 10,
    },
    marketText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    priceCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      padding: 14,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
    priceIconBox: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#F1F5F9',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    priceInfo: {
      flex: 1,
    },
    priceLabel: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 2,
    },
    priceValue: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    priceUnit: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    updateInfo: {
      alignItems: 'flex-end',
      minWidth: 80,
    },
    updateLabel: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 2,
    },
    updateTime: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
  });



export default HomeGoldCard;
