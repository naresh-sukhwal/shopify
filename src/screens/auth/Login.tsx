import React, { useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { fontFamily, fontSize, Ionicons, Feather } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { LoginSchema } from '@/utils/validations.utils';
import { countryData, ICountry } from '@/utils/countryData';
import CountryPickerSheet from '@/components/bottomSheets/CountryPickerSheet';
import { ASYNC_KEYS } from '@/utils/contant.utils';
import { setAsyncStorage } from '@/utils/helper.utils';
import { ERoles, TLoginStackProps } from '@/interface';
import AuthComponent from '@/components/layouts/auth/AuthComponent';
import { navigate } from '@/utils/navigation.utils';

type LoginFormValues = {
  phone: string;
};

export default function Login({ navigation }: TLoginStackProps) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const countrySheetRef = useRef<any>(null);
  const [selectedCountry, setSelectedCountry] = useState<ICountry>(
    countryData.find(c => c.dialCode === '+91') || countryData[0],
  );

  const handleLogin = async (values: LoginFormValues) => {
    await setAsyncStorage(ASYNC_KEYS.IS_LOGGEDIN, 'false');
    navigation.navigate('OtpVerification', {
      countryCode: selectedCountry.dialCode,
      phoneNumber: values.phone,
    });
  };

  return (
    <AuthComponent
      title="India's First AI-Powered Multilingual Messenger"
      cardLabel="Login to continue to BharatTalk"
      onLanguagePress={() => navigate('LanguageScreen')}
      bottomContent={
        <View>
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don&apos;t have an account?</Text>
            <Pressable onPress={() => navigation.navigate('Signup', { role: ERoles.SEEKER })}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </Pressable>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <View style={styles.chatIconBubble}>
              <Feather
                name="message-circle"
                size={fontSize.f20}
                color={themeColor.secondary}
              />
            </View>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.featuresRow}>
            {[
              {
                icon: 'shield-outline',
                label: 'End-to-End\nEncrypted',
              },
              {
                icon: 'language-outline',
                label: 'AI Powered\nTranslation',
              },
              {
                icon: 'globe-outline',
                label: 'Multi-Language\nSupport',
              },
              {
                icon: 'flash-outline',
                label: 'Fast &\nReliable',
              },
            ].map(item => (
              <View key={item.label} style={styles.featureItem}>
                <View style={styles.featureIconWrap}>
                  <Ionicons
                    name={item.icon as any}
                    size={fontSize.f20}
                    color={themeColor.secondary}
                  />
                </View>
                <Text style={styles.featureLabel}>{item.label}</Text>
              </View>
            ))}
          </View>
        </View>
      }
    >
      <Formik<LoginFormValues>
        initialValues={{ phone: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.phoneRow}>
              <Pressable
                style={styles.countryButton}
                onPress={() => countrySheetRef.current?.open()}
              >
                <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                <Text style={styles.dialText}>{selectedCountry.dialCode}</Text>
                <Ionicons
                  name="chevron-down"
                  size={fontSize.f12}
                  color={themeColor.secondaryS2}
                />
              </Pressable>

              <View style={styles.phoneInputWrap}>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter your phone number"
                  placeholderTextColor={themeColor.textS2}
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                />
              </View>
            </View>

            {touched.phone && errors.phone ? (
              <Text style={styles.errorText}>{errors.phone}</Text>
            ) : null}

            <Pressable
              onPress={handleSubmit as any}
              style={({ pressed }) => [styles.submitButton, pressed && styles.submitPressed]}
            >
              <Text style={styles.submitText}>Continue with Phone Number</Text>
              <Ionicons
                name="arrow-forward"
                size={fontSize.f18}
                color={themeColor.white}
                style={styles.submitIcon}
              />
            </Pressable>
          </>
        )}
      </Formik>

      <CountryPickerSheet
        sheetRef={countrySheetRef}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
      />
    </AuthComponent>
  );
}

const createStyle = (themeColor: any) =>
  StyleSheet.create({
    phoneRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    countryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColor.white,
      borderRadius: 14,
      paddingHorizontal: wp('3%'),
      height: 52,
      borderWidth: 1,
      borderColor: 'rgba(15, 23, 42, 0.08)',
      marginRight: wp('3%'),
    },
    flagText: {
      fontSize: fontSize.f16,
      marginRight: 6,
    },
    dialText: {
      color: themeColor.secondary,
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
      marginRight: 2,
    },
    phoneInputWrap: {
      flex: 1,
      height: 52,
      justifyContent: 'center',
      backgroundColor: themeColor.white,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: 'rgba(15, 23, 42, 0.08)',
      paddingHorizontal: wp('4%'),
    },
    phoneInput: {
      flex: 1,
      color: themeColor.secondary,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      paddingVertical: 0,
    },
    errorText: {
      marginTop: hp('0.8%'),
      color: themeColor.red,
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
    },
    submitButton: {
      marginTop: hp('2.3%'),
      minHeight: 58,
      borderRadius: 16,
      backgroundColor: themeColor.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: wp('5%'),
      shadowColor: themeColor.secondary,
      shadowOpacity: 0.22,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 14,
      elevation: 6,
    },
    submitPressed: {
      opacity: 0.92,
      transform: [{ scale: 0.99 }],
    },
    submitText: {
      color: themeColor.white,
      fontSize: fontSize.f16,
      fontFamily: fontFamily.semiBold,
    },
    submitIcon: {
      marginLeft: 10,
    },
    signupRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp('2.2%'),
    },
    signupText: {
      color: themeColor.textS2,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      marginRight: 6,
    },
    signupLink: {
      color: themeColor.secondary,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
    },
    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: hp('2.5%'),
      marginBottom: hp('4%'),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: 'rgba(15, 23, 42, 0.16)',
    },
    chatIconBubble: {
      marginHorizontal: wp('3%'),
      alignItems: 'center',
      justifyContent: 'center',
    },
    featuresRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingBottom: hp('2%'),
    },
    featureItem: {
      width: '23%',
      alignItems: 'center',
    },
    featureIconWrap: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: themeColor.white,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: hp('1%'),
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 10,
      elevation: 3,
    },
    featureLabel: {
      textAlign: 'center',
      color: themeColor.secondary,
      fontSize: fontSize.f10,
      lineHeight: fontSize.f12,
      fontFamily: fontFamily.semiBold,
    },
  });
