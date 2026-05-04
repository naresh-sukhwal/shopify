import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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

const HomeQuickActions: React.FC = () => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);

  const renderIcon = (name: string, type: string, color: string) => {
    if (type === 'Feather') {
      return <Feather name={name as any} size={24} color={color} />;
    }
    return <Ionicons name={name as any} size={24} color={color} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.quick_actions')}</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>{t('home.view_all')}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {quickActionsData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.actionCard, item.isSpecial && styles.specialCard]}
            onPress={() => navigate('MainStack', { screen: item.route })}
          >
            <View
              style={[
                styles.iconContainer,
                item.isSpecial && styles.specialIconContainer,
              ]}
            >
              {renderIcon(
                item.icon,
                item.iconType,
                item.isSpecial ? '#000' : '#FFF',
              )}
            </View>
            <Text style={styles.actionTitle} numberOfLines={2}>
              {t(item.title)}
            </Text>
            <Text style={styles.actionSubtitle} numberOfLines={1}>
              {t(item.subtitle)}
            </Text>
          </TouchableOpacity>
        ))}
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
    },
    specialCard: {
      backgroundColor: '#FEF3C7', // Light gold
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    specialIconContainer: {
      backgroundColor: theme.white,
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
