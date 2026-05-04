import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as types from '@/interface';
import { fontFamily, fontSize, Ionicons, MaterialDesignIcons } from '@/utils/fontIcon.utils';
import IconBackground from '@/components/layouts/common/IconBackground';

interface BankCardProps {
  bankName: string;
  accountType: string;
  accountNumber: string;
  isPrimary?: boolean;
  ifsc: string;
  processingTime: string;
  transferType: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const BankCard: React.FC<BankCardProps> = ({
  bankName,
  accountType,
  accountNumber,
  isPrimary = false,
  ifsc,
  processingTime,
  transferType,
  isSelected = false,
  onPress,
}) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  return (
    <TouchableOpacity 
      style={[styles.bankCard, isSelected && styles.selectedBankCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.bankTop}>
        <View style={styles.bankInfoRow}>
          <View style={styles.bankLogoBox}>
            <MaterialDesignIcons
              name="bank"
              size={24}
              color={themeColor.white}
            />
          </View>
          <View>
            <Text style={styles.bankName}>{bankName}</Text>
            <Text style={styles.bankAccountType}>
              {accountType} • •••• {accountNumber.slice(-4)}
            </Text>
            {isPrimary && (
              <View style={styles.primaryBadge}>
                <View style={styles.greenDot} />
                <Text style={styles.primaryText}>
                  {t('wallet.primary')} • {t('wallet.ifsc')}: {ifsc}
                </Text>
              </View>
            )}
          </View>
        </View>
        {isSelected && (
          <IconBackground style={styles.selectionCircle}>
            <Ionicons
              name="checkmark-sharp"
              size={16}
              color={themeColor.secondary}
            />
          </IconBackground>
        )}
      </View>
      <View style={styles.bankDivider} />
      <View style={styles.bankFooter}>
        <View style={styles.bankFooterItem}>
          <Text style={styles.bankFooterLabel}>
            {t('wallet.processing_time')}
          </Text>
          <Text style={styles.bankFooterValue}>{processingTime}</Text>
        </View>
        <View style={styles.bankFooterItem}>
          <Text style={styles.bankFooterLabel}>
            {t('wallet.bank_transfer_type')}
          </Text>
          <Text style={styles.bankFooterValue}>{transferType}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    bankCard: {
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    selectedBankCard: {
      borderColor: theme.gold,
    },
    bankTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    bankInfoRow: {
      flexDirection: 'row',
      gap: 12,
    },
    bankLogoBox: {
      width: 48,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bankName: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    bankAccountType: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 2,
    },
    primaryBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: theme.greenS1,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      marginTop: 8,
    },
    greenDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.green,
    },
    primaryText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.bold,
      color: theme.green,
    },
    selectionCircle: {
      width: 28,
      height: 28,
      borderRadius: 14,
    },
    bankDivider: {
      height: 1,
      backgroundColor: theme.grayS3,
      marginVertical: 16,
    },
    bankFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bankFooterItem: {
      flex: 1,
    },
    bankFooterLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 2,
    },
    bankFooterValue: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
  });

export default BankCard;
