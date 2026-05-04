import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import * as types from '@/interface';
import StackHeader from '@/components/headers/StackHeader';
import EnterAmountContainer from '@/components/wallet/EnterAmountContainer';
import InfoComponent from '@/components/layouts/common/InfoComponent';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { AppBackground, CustomButton } from '@/components';
import { useTranslation } from 'react-i18next';
import { navigateAndSimpleReset } from '@/utils/navigation.utils';

export default function AddMoneyInitial() {
  const styles = useThemedStyles(createStyles);
  const [amount, setAmount] = useState('5000');
  const { t } = useTranslation();

  const onSkip = () => {
    navigateAndSimpleReset('MainStack');
  };

  return (
    <AppBackground>
      <View style={styles.container}>
        <StackHeader
          title={t('wallet.add_money')}
          subtitle={t('wallet.wallet_label')}
        />
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Text style={styles.skipText}>{t('wallet.skip')}</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>{t('wallet.enter_amount')}</Text>

          <EnterAmountContainer
            amount={amount}
            setAmount={setAmount}
            style={styles.amountContainer}
          />

          <InfoComponent
            isDark
            title={t('wallet.save_money_daily')}
            description={t('wallet.save_money_desc')}
            customIcon="shield-checkmark-outline"
            style={styles.infoCard}
          />

          <View style={styles.spacer} />

          <CustomButton
            title={`${t('wallet.setup_daily_savings')} ->`}
            onPress={onSkip}
            style={styles.primaryButton}
            // isGradiantRequired={false}
          />
        </ScrollView>
      </View>
    </AppBackground>
  );
}

const createStyles = (themeColor: types.themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColor.backgroundColor,
    },
    skipButton: {
      position: 'absolute',
      top: hp('3.2%'),
      right: wp('5%'),
      zIndex: 10,
    },
    skipText: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: themeColor.secondary,
      textDecorationLine: 'underline',
    },
    scrollContent: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('5%'),
    },
    sectionTitle: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: themeColor.secondary,
      marginTop: hp('4%'),
      marginBottom: hp('2%'),
    },
    amountContainer: {
      width: '100%',
      marginBottom: hp('3%'),
    },
    infoCard: {
      width: '100%',
      marginTop: hp('1%'),
    },
    spacer: {
      height: hp('4%'),
    },
    primaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 32,
      width: '100%',
      shadowColor: themeColor.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    primaryButtonText: {
      color: themeColor.white,
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      marginRight: 10,
    },

  });
