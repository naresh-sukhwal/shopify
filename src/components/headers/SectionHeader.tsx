import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fontSize, fontFamily } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
import { hp } from '@/utils/responsive.utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  showSeeAll?: boolean;
  onPressSeeAll?: () => void;
  titleBadge?: React.ReactNode;
}

export default function SectionHeader({
  title,
  subtitle,
  showSeeAll = true,
  onPressSeeAll,
  titleBadge,
}: SectionHeaderProps) {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: themeColor.text }]}>{title}</Text>
        {titleBadge && <View style={styles.badgeWrapper}>{titleBadge}</View>}
        {subtitle && (
          <Text style={[styles.subtitle, { color: themeColor.textS2 }]}>
            {subtitle}
          </Text>
        )}
      </View>

      {showSeeAll && onPressSeeAll && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPressSeeAll} style={styles.seeAllButton}>
          <Text style={[styles.seeAllText, { color: themeColor.buttonBackground }]}>
            {t('home.see_all', 'View All')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp('1.5%'),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    title: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
    },
    badgeWrapper: {
      marginLeft: 8,
    },
    subtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.regular,
      width: '100%',
      marginTop: 2,
    },
    seeAllButton: {
      paddingVertical: 4,
      paddingLeft: 12,
    },
    seeAllText: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.semiBold,
    },
  });
