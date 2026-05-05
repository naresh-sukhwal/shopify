import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface/theme.type';
import {
  fontFamily,
  fontSize,
  Ionicons,
  Feather,
} from '@/utils/fontIcon.utils';
import { wp } from '@/utils/responsive.utils';
import { quickActionsData } from '@/utils/contant.utils';
import { navigate } from '@/utils/navigation.utils';
import LinearGradient from 'react-native-linear-gradient';

const HomeQuickActions: React.FC = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  const renderIcon = (name: string, type: string, color: string) => {
    if (type === 'Feather') {
      return <Feather name={name as any} size={24} color={color} />;
    }
    return <Ionicons name={name as any} size={24} color={color} />;
  };

  const onCardPress = (id: number) => {
    switch (id) {
      case 1:
        navigate('MainStack', { screen: 'AddMoney' });
        break;
      case 2:
        navigate('MainStack', { screen: 'Withdraw' });
        break;
      case 3:
        navigate('MainStack', {
          screen: 'TabStack',
          params: { screen: 'InvestScreen' },
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.quick_actions')}</Text>
        <Pressable>
          <Text style={styles.viewAll}>{t('home.view_all')}</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {quickActionsData.map(item => {
          const CardContent = (
            <>
              <View
                style={[
                  styles.iconContainer,
                  item.iconBg === 'white' && styles.whiteIconContainer,
                  item.iconBg === 'secondary' && styles.blackIconContainer,
                ]}
              >
                {renderIcon(
                  item.icon,
                  item.iconType,
                  item.iconColor === 'white' ? '#FFF' : '#000',
                )}
              </View>
              <Text style={styles.actionTitle} numberOfLines={2}>
                {t(item.title)}
              </Text>
              <Text style={styles.actionSubtitle} numberOfLines={1}>
                {t(item.subtitle)}
              </Text>
            </>
          );

          if (item.isSpecial) {
            return (
              <Pressable key={item.id} onPress={() => onCardPress(item.id)}>
                <LinearGradient
                  colors={['#FDE68A', '#FEF9E7']}
                  style={styles.actionCard}
                >
                  {CardContent}
                </LinearGradient>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={item.id}
              style={styles.actionCard}
              onPress={() => onCardPress(item.id)}
            >
              {CardContent}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    viewAll: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      textDecorationLine: 'underline',
    },
    scrollContent: {
      gap: 12,
      paddingRight: 20,
    },
    actionCard: {
      width: wp('28%'),
      backgroundColor: theme.white,
      borderRadius: 24,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
      marginBottom: 5,
      minHeight: 140,
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    whiteIconContainer: {
      backgroundColor: theme.white,
    },
    blackIconContainer: {
      backgroundColor: theme.secondary,
    },
    actionTitle: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginBottom: 4,
    },
    actionSubtitle: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
  });

export default HomeQuickActions;
