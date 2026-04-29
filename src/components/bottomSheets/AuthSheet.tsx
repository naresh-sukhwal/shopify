import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import BottomSheet from './BottomSheet';
import { height } from '@/utils/responsive.utils';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { useSelector } from 'react-redux';
import { closeAuthSheet, globalRBSheetRef } from '@/utils/bottomSheetRef.utils';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import CustomButton from '../buttons/CustomButton';
import { navigate } from '@/utils/navigation.utils';
import { useTranslation } from 'react-i18next';

export default function AuthSheet() {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  const { t } = useTranslation();
  const onPressButton = (screen: 'Login' | 'Signup') => {
    closeAuthSheet();
    setTimeout(() => {
      navigate('AuthStack', { screen: screen });
    }, 500);
  };
  return (
    <BottomSheet Ref={globalRBSheetRef} sheetHeight={height / 2.5}>
      <View style={styles.container}>
        <Text style={styles.title}>{t('auth.authSheetTitle')}</Text>

        <View style={{ width: '100%', flex: 1 }}>
          <Ionicons
            name="person"
            size={45}
            style={styles.icon}
            color={themeColor.primary}
          />
          <CustomButton
            title={t('auth.login')}
            onPress={() => onPressButton('Login')}
            style={styles.login}
            isGradiantRequired={false}
          />
          <CustomButton
            title={t('auth.sign_up')}
            onPress={() => onPressButton('Signup')}
            style={styles.signup}
            isGradiantRequired={false}
            textStyle={{ color: themeColor.text }}
          />
        </View>
      </View>
    </BottomSheet>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: 15,
      borderColor: themeColor.extraLightText,
      width: '100%',
    },
    title: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.montserratBold,
      color: themeColor.text,
      borderBottomWidth: 0.5,
      padding: 10,
      textAlign: 'center',
      width: '100%',
      borderColor: themeColor.borderColor,
    },
    login: {
      width: '100%',
      marginTop: 30,
    },
    signup: {
      width: '100%',
      borderColor: themeColor.primary,
      backgroundColor: themeColor.white,
      borderWidth: 2,
      marginTop: 30,
    },
    icon: {
      marginTop: 30,
      alignSelf: 'center',
      height: 50,
      width: 50,
    },
  });
