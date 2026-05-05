import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { AppBackground, CustomButton, StackHeader } from '@/components';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import {
  KycPersonalSchema,
  KycDocumentSchema,
} from '@/utils/validations.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { useThemeColor } from '@/hooks/useThemeColor';
import PersonalDetails from './components/PersonalDetails';
import DocumentVerification from './components/DocumentVerification';
import { ASYNC_KEYS } from '@/utils/contant.utils';
import { setAsyncStorage } from '@/utils/helper.utils';

export default function KycDetails({ navigation }: any) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const initialValues = {
    fullName: '',
    phone: '',
    email: '',
    address: '',
    aadhaarNumber: '',
    bankAccountNumber: '',
    ifscCode: '',
    frontId: '',
    backId: '',
  };

  const handleBack = useCallback(() => {
    if (step === 2) {
      setStep(1);
      return true;
    }
    return false;
  }, [step]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );
    return () => backHandler.remove();
  }, [handleBack]);

  const handleNext = (values: any, { setTouched }: any) => {
    setStep(2);
    // Reset touched state for Step 2 fields to avoid immediate validation errors
    setTouched({});
  };

  const handleSubmit = async (values: any) => {
    console.log('Final Submit:', values);
    await setAsyncStorage(ASYNC_KEYS.IS_KYC_COMPLETED, 'true');
    navigation.replace('AddMoneyInitial');
  };

  return (
    <AppBackground>
      <StackHeader
        title={t('kyc.verification_title')}
        subtitle={t('kyc.verification_subtitle')}
        onBackPress={() => (step === 2 ? setStep(1) : navigation.goBack())}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={[styles.stepTitle, { color: themeColor.secondary }]}>
            {step === 1
              ? t('kyc.personal_details')
              : t('kyc.documents_verification')}
          </Text>

          <Formik
            initialValues={initialValues}
            validationSchema={
              step === 1 ? KycPersonalSchema : KycDocumentSchema
            }
            onSubmit={step === 1 ? handleNext : handleSubmit}
            validateOnBlur={true}
            validateOnChange={true}
          >
            {({
              handleChange,
              handleSubmit: formikSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              setTouched,
            }) => (
              <View style={styles.formContainer}>
                {step === 1 ? (
                  <PersonalDetails
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    styles={styles}
                  />
                ) : (
                  <DocumentVerification
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    styles={styles}
                  />
                )}

                <CustomButton
                  title={
                    step === 1
                      ? `${t('kyc.next_btn')}  →`
                      : `${t('kyc.submit_verification')}  →`
                  }
                  onPress={formikSubmit}
                  style={[
                    styles.submitBtn,
                    { backgroundColor: themeColor.secondary },
                  ]}
                  textStyle={styles.submitBtnText}
                  isGradiantRequired={false}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    scrollContent: {
      paddingBottom: hp('5%'),
    },
    stepTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
      textAlign: 'center',
      marginTop: hp('2%'),
      marginBottom: hp('3%'),
    },
    formContainer: {
      paddingHorizontal: wp('5%'),
    },
    card: {
      backgroundColor: '#FEFEFD',
      borderRadius: 20,
      padding: 20,
      marginBottom: 20,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
    },
    submitBtn: {
      height: 60,
      borderRadius: 30,
      marginTop: hp('2%'),
    },
    submitBtnText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
      textTransform: 'none',
    },
    aadhaarRow: {
      flexDirection: 'row',
      alignItems: 'flex-start', // Top alignment for the row
    },
    verifyBtnContainer: {
      height: 50, // Match CustomTextInput height (approx)
      marginTop: 27, // Match the label offset + some padding
      justifyContent: 'center',
    },
    verifyBtn: {
      height: 45,
      paddingHorizontal: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    verifyBtnText: {
      color: '#FFF',
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f12,
    },
    infoText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f11,
      marginTop: 10,
      lineHeight: 16,
    },
    cardSubTitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
      marginBottom: 5,
    },
    idTypes: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
      marginBottom: 20,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#F0EAD6',
      borderRadius: 20,
      padding: 15,
      backgroundColor: '#FFFDF9',
    },
    pickerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    uploadIconBox: {
      width: 50,
      height: 50,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
    },
    uploadInfo: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f11,
    },
    chooseBtn: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 12,
    },
    chooseText: {
      color: '#FFF',
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f12,
    },
    previewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    previewBox: {
      width: '48%',
    },
    previewLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f11,
      marginBottom: 5,
    },
    imagePlaceholder: {
      height: 80,
      borderWidth: 1,
      borderColor: '#E5E5E5',
      borderStyle: 'dashed',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      overflow: 'hidden',
    },
    previewImage: {
      width: '100%',
      height: '100%',
    },
    deleteIcon: {
      position: 'absolute',
      top: 5,
      right: 5,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    notAdded: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f10,
      marginTop: 5,
    },
    miniError: {
      color: 'red',
      fontSize: 10,
      fontFamily: fontFamily.medium,
      marginTop: 2,
    },
    secureBox: {
      borderRadius: 25,
      padding: 20,
      marginBottom: 20,
    },
    secureHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    shieldIconBox: {
      width: 45,
      height: 45,
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.1)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    secureTitle: {
      color: '#FFF',
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f15,
    },
    secureDesc: {
      color: 'rgba(255,255,255,0.7)',
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f11,
      lineHeight: 16,
      marginTop: 4,
    },
    pillsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
