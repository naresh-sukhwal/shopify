import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { LoginSchema } from '@/utils/validations.utils';
import { CustomButton, PhoneInput, AuthComponent } from '@/components';
import { countryData, ICountry } from '@/utils/countryData';

export default function Login({ navigation }: any) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState<ICountry>(
    countryData.find(c => c.dialCode === '+91') || countryData[0],
  );

  const handleLogin = (values: { phone: string }) => {
    navigation.navigate('OtpVerification', { phone: values.phone });
  };

  return (
    <AuthComponent
      title={t('auth.invest_title')}
      subtitle={t('auth.invest_subtitle')}
      cardLabel={t('auth.login_label')}
      cardTitle={t('auth.continue_mobile')}
    >
      <View style={styles.innerContainer}>
        <Formik
          initialValues={{ phone: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <>
              <PhoneInput
                label={t('auth.mobile_number')}
                placeholder={t('auth.mobile_placeholder')}
                value={values.phone}
                onChangeText={handleChange('phone')}
                selectedCountry={selectedCountry}
                onSelectCountry={setSelectedCountry}
                errorMsg={touched.phone && errors.phone ? errors.phone : ''}
                containerStyle={styles.phoneInputContainer}
              />

              <Text style={[styles.helperText, { color: themeColor.textS2 }]}>
                {t('auth.otp_helper')}
              </Text>

              <CustomButton
                title={`${t('auth.continue_btn')}  →`}
                onPress={handleSubmit}
                style={[
                  styles.button,
                  { backgroundColor: themeColor.secondary },
                ]}
                textStyle={styles.buttonText}
                isGradiantRequired={false}
              />
            </>
          )}
        </Formik>
      </View>
    </AuthComponent>
  );
}

const createStyle = () =>
  StyleSheet.create({
    innerContainer: {
      borderRadius: 30,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      backgroundColor: '#FEFEFD',
      overflow: 'hidden',
    },
    phoneInputContainer: {
      marginBottom: 10,
    },
    helperText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
    },
    button: {
      width: '100%',
      height: 55,
      borderRadius: 25,
      marginTop: 25,
    },
    buttonText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
      textTransform: 'none',
    },
  });
