import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { wp } from '@/utils/responsive.utils';
import { useTranslation } from 'react-i18next';
import { CustomButton, AuthComponent } from '@/components';
import { OtpInput } from 'react-native-otp-entry';
import {
  navigateAndSimpleReset,
  resetToNestedScreen,
} from '@/utils/navigation.utils';
import { getAsyncStorage, setAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';

export default function OtpVerification({ navigation, route }: any) {
  const { phone } = route.params || { phone: '' };
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    if (otp.length === 6) {
      const isKycCompleted = await getAsyncStorage(ASYNC_KEYS.IS_KYC_COMPLETED);
      await setAsyncStorage(ASYNC_KEYS.ACCESS_TOKEN, 'dummy_token');
      if (isKycCompleted) {
        navigateAndSimpleReset('MainStack');
      } else {
        resetToNestedScreen('MainStack', 'KycDetails');
      }
    }
  };

  return (
    <AuthComponent
      title={t('auth.invest_title')}
      subtitle={t('auth.invest_subtitle')}
      cardLabel={t('auth.otp_label')}
      cardTitle={t('auth.enter_otp_sent', { phone })}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.innerLabel, { color: themeColor.textS2 }]}>
          {t('auth.enter_otp_label')}
        </Text>
        <OtpInput
          numberOfDigits={6}
          onTextChange={setOtp}
          onFilled={setOtp}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
            focusedPinCodeContainerStyle: {
              borderColor: themeColor.yellow,
              borderWidth: 2,
            },
          }}
        />
        <View style={styles.linksRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.linkText, { color: themeColor.textS2 }]}>
              {t('auth.change_number')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.linkText, { color: themeColor.textS2 }]}>
              {t('auth.resend_otp')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <CustomButton
        title={`${t('auth.continue_btn')}  →`}
        onPress={handleVerify}
        style={[styles.button, { backgroundColor: themeColor.secondary }]}
        textStyle={styles.buttonText}
        isGradiantRequired={false}
      />
    </AuthComponent>
  );
}

const createStyle = () =>
  StyleSheet.create({
    innerContainer: {
      borderRadius: 30,
      paddingHorizontal: 15,
      paddingVertical: 20,
      marginBottom: 30,
      elevation: 3,
      backgroundColor: '#FEFEFD',
      overflow: 'hidden',
    },
    innerLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
      marginBottom: 15,
    },
    otpContainer: {
      marginBottom: 15,
      justifyContent: 'space-between',
    },
    otpBox: {
      width: wp('11%'),
      height: wp('12%'),
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
    },
    otpText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f18,
    },
    linksRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    linkText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f13,
      textDecorationLine: 'underline',
    },
    button: {
      width: '100%',
      height: 55,
      borderRadius: 25,
      marginTop: 0,
      marginBottom: 20,
    },
    buttonText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
      textTransform: 'none',
    },
  });
