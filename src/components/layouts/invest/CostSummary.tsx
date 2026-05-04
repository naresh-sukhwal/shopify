import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as types from '@/interface';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import InfoComponent from '@/components/layouts/common/InfoComponent';

interface CostSummaryProps {
  amount: number;
  grams: number;
  livePrice: number;
}

const CostSummary: React.FC<CostSummaryProps> = ({
  amount,
  grams,
  livePrice,
}) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  const platformCharges = 59.0;
  const taxes = 49.2;
  const goldAmount = amount;
  const total = goldAmount + platformCharges + taxes;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t('invest.cost_summary')}</Text>
          <Text style={styles.subtitle}>{t('invest.cost_summary_desc')}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.detailsText}>{t('invest.details')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.payableRow}>
          <View>
            <Text style={styles.payableLabel}>{t('invest.payable_now')}</Text>
            <Text style={styles.payableInfo}>
              For {grams.toFixed(3)} g at ₹ {livePrice.toLocaleString()}/g
            </Text>
          </View>
          <Text style={styles.payableValue}>₹ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
        </View>

        <View style={styles.breakdownContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>{t('invest.gold_amount_label')}</Text>
            <Text style={styles.value}>₹ {goldAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('invest.platform_charges')}</Text>
            <Text style={styles.value}>₹ {platformCharges.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>{t('invest.taxes_gst')}</Text>
            <Text style={styles.value}>₹ {taxes.toFixed(2)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{t('invest.total')}</Text>
            <Text style={styles.totalValue}>₹ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
          </View>
        </View>
      </View>


      <InfoComponent
        isDark
        title={t('invest.transparent_pricing')}
        description={t('invest.transparent_pricing_desc')}
        customIcon="shield-checkmark-outline"
        style={styles.infoBanner}
      />
    </View>
  );
};

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.white,
      padding: 20,
      borderRadius: 32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
      marginTop: 16,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
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
      marginTop: 4,
    },
    detailsText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textDecorationLine: 'underline',
    },
    summaryContainer: {
      backgroundColor: theme.white,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.grayS3,
      overflow: 'hidden',
      marginBottom: 16,
    },
    payableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#FEF9E7',
    },
    payableLabel: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    payableInfo: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 2,
    },
    payableValue: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    breakdownContainer: {
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    label: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    value: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 4,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.grayS3,
    },
    totalLabel: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    totalValue: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    infoBanner: {
      marginTop: 0,
    },
  });

export default CostSummary;
