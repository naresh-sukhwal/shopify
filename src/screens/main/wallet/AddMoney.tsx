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
import { AppBackground } from '@/components';
import StackHeader from '@/components/headers/StackHeader';
import EnterAmountContainer from '@/components/layouts/wallet/EnterAmountContainer';
import InfoComponent from '@/components/layouts/common/InfoComponent';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { InfoVariant } from '@/interface/general.type';
import PaymentMethodSelector from '@/components/layouts/wallet/PaymentMethodSelector';

const AddMoney: React.FC = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();
  const [amount, setAmount] = useState('5000');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'BANK'>('UPI');

  return (
    <AppBackground>
      <View style={styles.container}>
        <StackHeader
          title={t('wallet.add_money')}
          subtitle={t('wallet.wallet_label')}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Payment Method Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {t('wallet.payment_method')}
            </Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>{t('wallet.limits')}</Text>
            </TouchableOpacity>
          </View>

          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onSelect={setPaymentMethod}
          />

          {/* Tip Section */}
          <InfoComponent
            isCard
            variant={InfoVariant.INFO}
            title={t('wallet.tip')}
            description={t('wallet.tip_desc')}
            style={styles.tipCard}
          />

          {/* Enter Amount Section */}
          <View style={[styles.sectionHeader, { marginTop: 24 }]}>
            <Text style={styles.sectionTitle}>{t('wallet.enter_amount')}</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>{t('wallet.fees_label')}</Text>
            </TouchableOpacity>
          </View>

          <EnterAmountContainer
            amount={amount}
            setAmount={setAmount}
            style={styles.amountContainer}
          />

          {/* Processing Details Section */}
          <Text
            style={[styles.sectionTitle, { marginTop: 24, marginBottom: 12 }]}
          >
            {t('wallet.processing_details')}
          </Text>

          <View style={styles.detailsList}>
            <InfoComponent
              isCard
              variant={InfoVariant.SUCCESS}
              title={t('wallet.typical_processing_time')}
              description={t('wallet.processing_time_desc')}
              customIcon="timer-outline"
              style={styles.detailInfoCard}
            />

            <InfoComponent
              isCard
              variant={InfoVariant.WARNING}
              title={t('wallet.fees_label')}
              description={t('wallet.fees_desc')}
              customIcon="cash-outline"
              style={styles.detailInfoCard}
            />

            <InfoComponent
              isDark
              title={t('wallet.secure_payments')}
              description={t('wallet.secure_payments_desc')}
              customIcon="shield-checkmark-outline"
              style={styles.detailInfoCard}
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerLabel}>{t('wallet.you_will_add')}</Text>
            <Text style={styles.footerValue}>
              ₹ {Number(amount).toLocaleString('en-IN')}
            </Text>
          </View>
          <TouchableOpacity style={styles.addBtn}>
            <Text style={styles.addBtnText}>{t('wallet.add_money')}</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFF" />
          </TouchableOpacity>
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
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    linkText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textDecorationLine: 'underline',
    },
    tipCard: {
      marginTop: 20,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    amountContainer: {
      width: '100%',
    },
    detailsList: {
      gap: 12,
    },
    detailInfoCard: {
      marginVertical: 0,
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.white,
      paddingHorizontal: wp('5%'),
      paddingVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: theme.grayS3,
    },
    footerLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginBottom: 2,
    },
    footerValue: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    addBtn: {
      flexDirection: 'row',
      backgroundColor: theme.secondary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 32,
      alignItems: 'center',
      gap: 8,
    },
    addBtnText: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.white,
    },
  });

export default AddMoney;
