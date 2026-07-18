import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { themeType } from '@/interface';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';

interface CheckoutStepperProps {
  activeStep: 1 | 2 | 3;
}

export default function CheckoutStepper({ activeStep }: CheckoutStepperProps) {
  const { t } = useTranslation();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.stepperContainer}>
      {/* Step 1 - Address */}
      <View style={styles.step}>
        <View
          style={[
            styles.stepCircle,
            activeStep >= 1 ? styles.stepCircleActive : {},
            {
              backgroundColor:
                activeStep >= 1
                  ? themeColor.buttonBackground
                  : themeColor.backgroundColorS2,
              borderColor: activeStep < 1 ? themeColor.borderColor : undefined,
            },
          ]}
        >
          {activeStep > 1 ? (
            <Ionicons name="checkmark" size={16} color={themeColor.white} />
          ) : (
            <Text
              style={[
                activeStep === 1 ? styles.stepTextActive : styles.stepText,
                {
                  color:
                    activeStep === 1 ? themeColor.white : themeColor.textS1,
                },
              ]}
            >
              1
            </Text>
          )}
        </View>
        <Text
          style={[
            activeStep === 1 ? styles.stepLabelActive : styles.stepLabel,
            {
              color:
                activeStep === 1
                  ? themeColor.buttonBackground
                  : themeColor.textS1,
            },
          ]}
        >
          {t('checkout.steps_address', 'Address')}
        </Text>
      </View>

      <View
        style={[
          styles.stepLine,
          {
            backgroundColor:
              activeStep > 1
                ? themeColor.buttonBackground
                : themeColor.borderColor,
          },
        ]}
      />

      {/* Step 2 - Review */}
      <View style={styles.step}>
        <View
          style={[
            styles.stepCircle,
            activeStep >= 2 ? styles.stepCircleActive : {},
            {
              backgroundColor:
                activeStep >= 2
                  ? themeColor.buttonBackground
                  : themeColor.backgroundColorS2,
              borderColor: activeStep < 2 ? themeColor.borderColor : undefined,
            },
          ]}
        >
          {activeStep > 2 ? (
            <Ionicons name="checkmark" size={16} color={themeColor.white} />
          ) : (
            <Text
              style={[
                activeStep === 2 ? styles.stepTextActive : styles.stepText,
                {
                  color:
                    activeStep === 2 ? themeColor.white : themeColor.textS1,
                },
              ]}
            >
              2
            </Text>
          )}
        </View>
        <Text
          style={[
            activeStep === 2 ? styles.stepLabelActive : styles.stepLabel,
            {
              color:
                activeStep === 2
                  ? themeColor.buttonBackground
                  : themeColor.textS1,
            },
          ]}
        >
          {t('checkout.steps_review', 'Review')}
        </Text>
      </View>

      <View
        style={[
          styles.stepLine,
          {
            backgroundColor:
              activeStep > 2
                ? themeColor.buttonBackground
                : themeColor.borderColor,
          },
        ]}
      />

      {/* Step 3 - Payment */}
      <View style={styles.step}>
        <View
          style={[
            styles.stepCircle,
            activeStep >= 3 ? styles.stepCircleActive : {},
            {
              backgroundColor:
                activeStep >= 3
                  ? themeColor.buttonBackground
                  : themeColor.backgroundColorS2,
              borderColor: activeStep < 3 ? themeColor.borderColor : undefined,
            },
          ]}
        >
          <Text
            style={[
              activeStep === 3 ? styles.stepTextActive : styles.stepText,
              {
                color: activeStep === 3 ? themeColor.white : themeColor.textS1,
              },
            ]}
          >
            3
          </Text>
        </View>
        <Text
          style={[
            activeStep === 3 ? styles.stepLabelActive : styles.stepLabel,
            {
              color:
                activeStep === 3
                  ? themeColor.buttonBackground
                  : themeColor.textS1,
            },
          ]}
        >
          {t('checkout.steps_payment', 'Payment')}
        </Text>
      </View>
    </View>
  );
}

const createStyles = (_theme: themeType) =>
  StyleSheet.create({
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp('2%'),
      marginTop: hp('2%'),
      marginBottom: hp('4%'),
    },
    step: {
      alignItems: 'center',
    },
    stepCircle: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
    },
    stepCircleActive: {
      borderWidth: 0,
    },
    stepTextActive: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
    },
    stepText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },
    stepLabelActive: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f12,
      marginTop: hp('1%'),
    },
    stepLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
      marginTop: hp('1%'),
    },
    stepLine: {
      flex: 1,
      height: 1,
      marginHorizontal: wp('2%'),
      marginBottom: hp('3%'),
    },
  });
