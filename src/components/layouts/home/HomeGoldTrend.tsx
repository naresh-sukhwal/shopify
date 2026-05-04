import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface/theme.type';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { wp } from '@/utils/responsive.utils';

const HomeGoldTrend: React.FC = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const [activeTab, setActiveTab] = useState('7D');

  const tabs = ['7D', '1M', '1Y'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t('home.gold_value_trend')}</Text>
          <Text style={styles.subtitle}>{t('home.last_7_days')}</Text>
        </View>
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Chart Placeholder */}
      <View style={styles.chartArea}>
         <View style={styles.chartHeader}>
            <Text style={styles.currentLabel}>Current</Text>
            <Text style={styles.currentValue}>₹ 48,620</Text>
         </View>
         <View style={styles.placeholderChart}>
            {/* Custom drawing or SVG would go here */}
            <View style={styles.waveLine} />
            <View style={styles.dataPoint} />
         </View>
         <View style={styles.daysRow}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <Text key={day} style={styles.dayText}>{day}</Text>
            ))}
         </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{t('home.gold_held')}</Text>
          <Text style={styles.statValue}>7.842 g</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>{t('home.avg_buy_price')}</Text>
          <Text style={styles.statValue}>₹ 5,972<Text style={styles.unit}>/g</Text></Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
      backgroundColor: theme.white,
      borderRadius: 32,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    subtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.grayS3,
      borderRadius: 12,
      padding: 4,
    },
    tab: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    activeTab: {
      backgroundColor: theme.white,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    tabText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    activeTabText: {
      color: theme.secondary,
      fontFamily: fontFamily.bold,
    },
    chartArea: {
        height: 200,
        marginBottom: 20,
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    currentLabel: {
        fontSize: fontSize.f12,
        fontFamily: fontFamily.medium,
        color: theme.secondaryS2,
    },
    currentValue: {
        fontSize: fontSize.f14,
        fontFamily: fontFamily.bold,
        color: theme.secondary,
    },
    placeholderChart: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    waveLine: {
        height: 2,
        backgroundColor: theme.primary,
        width: '100%',
        borderRadius: 1,
        opacity: 0.5,
    },
    dataPoint: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.secondary,
        position: 'absolute',
        right: 0,
        top: '50%',
        marginTop: -4,
    },
    daysRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dayText: {
        fontSize: fontSize.f10,
        fontFamily: fontFamily.medium,
        color: theme.secondaryS2,
    },
    statsRow: {
      flexDirection: 'row',
      gap: 12,
    },
    statBox: {
      flex: 1,
      backgroundColor: theme.grayS3,
      borderRadius: 16,
      padding: 12,
    },
    statLabel: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 4,
    },
    statValue: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    unit: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
    },
  });

export default HomeGoldTrend;
