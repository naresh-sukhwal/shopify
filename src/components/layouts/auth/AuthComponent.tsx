import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from 'react-native';
import GradiantBackground from '@/components/background/GradiantBackground';
import { themeType } from '@/interface';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import {
  fontFamily,
  fontSize,
  Ionicons,
  MaterialDesignIcons,
} from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';

interface AuthComponentProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  cardLabel: string;
  cardTitle: string;
  badgeVisible?: boolean;
  containerStyle?: ViewStyle;
}

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  title,
  subtitle,
  cardLabel,
  cardTitle,
  badgeVisible = true,
  containerStyle,
}) => {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const { t } = useTranslation();

  return (
    <GradiantBackground>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, containerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: themeColor.secondary }]}>
              {title}
            </Text>
            <Text style={[styles.subtitle, { color: themeColor.textS2 }]}>
              {subtitle}
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardLabelContainer}>
                <Text style={[styles.label, { color: themeColor.textS2 }]}>
                  {cardLabel}
                </Text>
                {badgeVisible && (
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#FFE49A', '#FFF9E9']}
                    style={[styles.badge]}
                  >
                    <MaterialDesignIcons
                      name="check-decagram-outline"
                      size={fontSize.f16}
                      color={themeColor.secondary}
                    />
                    <Text
                      style={[
                        styles.badgeText,
                        { color: themeColor.secondary },
                      ]}
                    >
                      {t('auth.trusted_vault')}
                    </Text>
                  </LinearGradient>
                )}
              </View>
              <Text style={[styles.cardTitle, { color: themeColor.secondary }]}>
                {cardTitle}
              </Text>
            </View>

            {children}

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: themeColor.textS2 }]}>
                {t('auth.terms_privacy_start')}
              </Text>
              <Text
                style={[styles.link, { color: themeColor.secondary }]}
                onPress={() => {}}
              >
                {t('auth.terms_privacy_link')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradiantBackground>
  );
};

export default AuthComponent;

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('5%'),
    },
    headerContainer: {
      marginTop: hp('6%'),
    },
    title: {
      fontFamily: fontFamily.extraBold,
      fontSize: fontSize.f24,
      lineHeight: 42,
      marginBottom: hp('1%'),
    },
    subtitle: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
      lineHeight: fontSize.f24,
    },
    card: {
      paddingHorizontal: wp('4.5%'),
      paddingTop: hp('3%'),
      paddingBottom: hp('6%'),
      elevation: 5,
      backgroundColor: '#FAF9F5',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      borderRadius: 40,
      marginTop: hp('4%'),
      overflow: 'hidden',
    },
    cardLabelContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardHeader: {
      marginBottom: hp('2%'),
    },
    label: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
      // marginBottom: 2,
    },
    cardTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
      marginTop: 4,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    badgeText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f11,
      marginLeft: 4,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    footerText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
      textAlign: 'center',
      lineHeight: 20,
    },
    link: {
      textDecorationLine: 'underline',
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f12,
    },
  });
