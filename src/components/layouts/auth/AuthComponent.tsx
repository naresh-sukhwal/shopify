import React, { ReactNode } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { IMAGES } from '@/assets';
import SafeAreaWrapper from '@/components/hoc/SafeAreaWrapper';

type Props = {
  title: string;
  children: ReactNode;
  bottomContent?: ReactNode;
  cardLabel?: string;
  onLanguagePress?: () => void;
  languageLabel?: string;
};

export default function AuthComponent({
  title,
  children,
  bottomContent,
  cardLabel,
  onLanguagePress,
  languageLabel = 'English',
}: Props) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  return (
    <ImageBackground
      source={IMAGES.landingScreenBg}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.topRow,]}>
            <Pressable
              style={styles.languagePill}
              onPress={onLanguagePress}
              disabled={!onLanguagePress}
            >
              <Ionicons
                name="globe-outline"
                size={fontSize.f16}
                color={themeColor.secondary}
              />
              <Text style={styles.languageText}>{languageLabel}</Text>
              <Ionicons
                name="chevron-forward"
                size={fontSize.f14}
                color={themeColor.secondary}
              />
            </Pressable>
          </View>

          <View style={styles.logoWrap}>
            <Image
              source={IMAGES.logoWithName}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>{title}</Text>

          <View style={styles.card}>
            {cardLabel ? (
              <Text style={styles.cardLabel}>{cardLabel}</Text>
            ) : null}
            {children}
          </View>

          {bottomContent ? (
            <View style={styles.bottomContent}>{bottomContent}</View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const createStyle = (themeColor: any) =>
  StyleSheet.create({
    flex: {
      flex: 1,
    },
    safeArea: {
      flex: 1,
      backgroundColor: themeColor.primary,
    },
    background: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: wp('6%'),
      paddingTop: hp('3%'),
      paddingBottom: hp('4%'),
    },
    topRow: {
      alignItems: 'flex-end',
      marginBottom: hp('2%'),
    },
    languagePill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColor.white,
      paddingHorizontal: wp('4%'),
      paddingVertical: hp('1.1%'),
      borderRadius: 24,
      borderWidth: 1,
      borderColor: 'rgba(15, 23, 42, 0.06)',
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 10,
      elevation: 4,
    },
    languageText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
      color: themeColor.secondary,
      marginHorizontal: 6,
    },
    logoWrap: {
      alignItems: 'center',
      marginTop: hp('1%'),
      marginBottom: hp('1.2%'),
    },
    logo: {
      width: wp('34%'),
      height: wp('34%'),
    },
    title: {
      fontFamily: fontFamily.extraBold,
      fontSize: fontSize.f24,
      lineHeight: fontSize.f30,
      textAlign: 'center',
      color: themeColor.secondary,
      marginTop: hp('1%'),
      marginBottom: hp('3.2%'),
    },
    card: {
      width: '100%',
      borderRadius: 28,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.75)',
      backgroundColor: 'rgba(255,255,255,0.48)',
      paddingHorizontal: wp('5.2%'),
      paddingTop: hp('2.8%'),
      paddingBottom: hp('3.2%'),
      shadowColor: '#94A3B8',
      shadowOpacity: 0.18,
      shadowOffset: { width: 0, height: 14 },
      shadowRadius: 24,
      elevation: 6,
    },
    cardLabel: {
      textAlign: 'center',
      color: themeColor.textS2,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      marginBottom: hp('2.2%'),
    },
    bottomContent: {
      marginTop: hp('2.2%'),
    },
  });
