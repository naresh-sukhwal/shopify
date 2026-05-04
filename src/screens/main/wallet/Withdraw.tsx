import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as types from '@/interface';
import { AppBackground, IconBackground } from '@/components';
import StackHeader from '@/components/headers/StackHeader';
import InfoComponent from '@/components/layouts/common/InfoComponent';
import {
  fontFamily,
  fontSize,
  Ionicons,
  Feather,
} from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import CardImageComponent from '@/components/layouts/common/CardImageComponent';
import BankCard from '@/components/layouts/wallet/BankCard';

const Withdraw: React.FC<types.TWithdrawProps> = ({ navigation }) => {

  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();
  const [amount, setAmount] = useState('1000');

  const balanceData = {
    total: '12,480',
    locked: '100',
    available: '12,380',
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <StackHeader
          title={t('wallet.withdraw_label')}
          subtitle={t('wallet.to_linked_bank')}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Card using CardImageComponent */}
          <CardImageComponent style={styles.availableCard}>
            <View style={styles.availableHeader}>
              <View>
                <Text style={styles.availableLabel}>
                  {t('wallet.available_to_withdraw')}
                </Text>
                <View style={styles.availableValueRow}>
                  <Text style={styles.availableValue}>
                    ₹ {balanceData.available}
                  </Text>
                  <Text style={styles.minText}>
                    {t('wallet.min_val', { val: '₹ 1,000' })}
                  </Text>
                </View>
              </View>
              <View style={styles.arrowIconBox}>
                <Feather
                  name="arrow-up-right"
                  size={24}
                  color={themeColor.secondary}
                />
              </View>
            </View>

            <View style={styles.deliveryInfoCard}>
              <View style={styles.deliveryItem}>
                <Ionicons
                  name="shield-checkmark"
                  size={18}
                  color={themeColor.secondary}
                />
                <Text style={styles.deliveryText} numberOfLines={1}>
                  UPI: instant • Bank transfer: up to 2 hours •{' '}
                  {t('wallet.to_linked_bank').split(' ')[2]}{' '}
                  {t('wallet.to_linked_bank').split(' ')[3]}
                </Text>
              </View>
            </View>

            <View style={styles.breakdownSection}>
              <View style={styles.breakdownHeader}>
                <Text style={styles.breakdownTitle}>
                  {t('wallet.balance_breakdown')}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('WalletScreen')}>
                  <Text style={styles.walletDetailsLink}>
                    {t('wallet.wallet_details')}
                  </Text>
                </TouchableOpacity>


              </View>
              <View style={styles.breakdownCards}>
                <View style={styles.miniCard}>
                  <Text style={styles.miniLabel}>{t('wallet.total')}</Text>
                  <Text style={styles.miniValue}>₹ {balanceData.total}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={styles.miniLabel}>{t('wallet.locked')}</Text>
                  <Text style={styles.miniValue}>₹ {balanceData.locked}</Text>
                </View>
                <View style={styles.miniCard}>
                  <Text style={styles.miniLabel}>{t('wallet.available')}</Text>
                  <Text style={styles.miniValue}>
                    ₹ {balanceData.available}
                  </Text>
                </View>
              </View>
            </View>
          </CardImageComponent>

          {/* Withdrawal Amount Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {t('wallet.withdrawal_amount')}
            </Text>
            <TouchableOpacity style={styles.maxBtn}>
              <Ionicons name="flash" size={16} color={themeColor.secondary} />
              <Text style={styles.maxBtnText}>{t('wallet.max')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subSectionTitle}>
            {t('wallet.min_withdrawal')} • {t('wallet.one_withdrawal_per_day')}
          </Text>

          <View style={styles.whiteCard}>
            <View style={styles.amountInputRow}>
              <IconBackground>
                <Text style={styles.currencySymbol}>₹</Text>
              </IconBackground>
              <View style={styles.amountInfo}>
                <Text style={styles.amountText}>{amount}</Text>
                <Text style={styles.availableSubText}>
                  {t('wallet.available')}: ₹ {balanceData.available}
                </Text>
              </View>
            </View>

            <View style={styles.quickAmountsRow}>
              {['1,000', '5,000', '10,000'].map(val => (
                <TouchableOpacity
                  key={val}
                  style={styles.quickAmountBtn}
                  onPress={() => setAmount(val.replace(',', ''))}
                >
                  <Text style={styles.quickAmountText}>₹ {val}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Bank Account Section */}
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={styles.sectionTitle}>{t('wallet.bank_account')}</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>{t('wallet.add_bank')}</Text>
            </TouchableOpacity>
          </View>

          <BankCard
            bankName="HDFC Bank"
            accountType="Savings"
            accountNumber="0245"
            isPrimary
            ifsc="HDFC0000..."
            processingTime="1-2 business days"
            transferType="IMPS / NEFT"
            isSelected
          />

          {/* Withdrawal Rules */}
          <InfoComponent
            isDark
            title={t('wallet.withdrawal_rules')}
            points={[
              t('wallet.min_withdrawal'),
              t('wallet.processing_time'),
              t('wallet.locked_wallet'),
            ]}
            customIcon="information-circle-outline"
            style={styles.rulesCard}
          />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.withdrawBtn}>
            <Feather
              name="arrow-up-right"
              size={20}
              color={themeColor.secondary}
            />
            <Text style={styles.withdrawBtnText}>
              {t('wallet.withdraw_btn', { val: `₹ ${amount}` })}
            </Text>
          </TouchableOpacity>
          <Text style={styles.disclaimerText}>
            {t('wallet.confirm_bank_details')}
          </Text>
        </View>
      </View>
    </AppBackground>
  );
};

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('15%'),
    },
    availableCard: {
      padding: 20,
      marginTop: 10,
    },
    availableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    availableLabel: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 4,
    },
    availableValueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 8,
    },
    availableValue: {
      fontSize: fontSize.f32,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    minText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    arrowIconBox: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.goldLight,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 0.8,
    },
    deliveryInfoCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.white,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 20,
      marginTop: 20,
      width: '100%',
      overflow: 'hidden',
    },
    deliveryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flex: 1,
    },
    deliveryText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondary,
      flex: 1,
    },
    breakdownSection: {
      marginTop: 24,
      backgroundColor: 'rgba(255,255,255,0.5)',
      padding: 16,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.5)',
    },
    breakdownHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    breakdownTitle: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    walletDetailsLink: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      textDecorationLine: 'underline',
    },
    breakdownCards: {
      flexDirection: 'row',
      gap: 8,
    },
    miniCard: {
      flex: 1,
      backgroundColor: theme.white,
      padding: 12,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    miniLabel: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 4,
    },
    miniValue: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 8,
    },
    sectionTitle: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    subSectionTitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 16,
    },
    maxBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: theme.white,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    maxBtnText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    whiteCard: {
      backgroundColor: theme.white,
      padding: 16,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.grayS3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    },
    amountInputRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    amountIconBox: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.gold,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    currencySymbol: {
      fontSize: fontSize.f20,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    amountInfo: {
      flex: 1,
      marginLeft: 12,
    },
    amountText: {
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    availableSubText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    quickAmountsRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    quickAmountBtn: {
      flex: 1,
      backgroundColor: theme.white,
      paddingVertical: 12,
      borderRadius: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    quickAmountText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    linkText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textDecorationLine: 'underline',
    },
    rulesCard: {
      marginTop: 24,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.white,
      paddingHorizontal: wp('5%'),
      paddingVertical: 20,
      borderTopWidth: 1,
      borderTopColor: theme.grayS3,
    },
    withdrawBtn: {
      flexDirection: 'row',
      backgroundColor: theme.goldLight,
      paddingVertical: 16,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      shadowColor: theme.gold,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    withdrawBtnText: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    disclaimerText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textAlign: 'center',
      marginTop: 12,
    },
  });

export default Withdraw;
