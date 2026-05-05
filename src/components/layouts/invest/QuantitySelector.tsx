import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as types from '@/interface';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';

interface QuantitySelectorProps {
  mode: 'amount' | 'grams';
  onModeChange: (mode: 'amount' | 'grams') => void;
  value: number;
  onValueChange: (val: number) => void;
  livePrice: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  mode,
  onModeChange,
  value,
  onValueChange,
  livePrice,
}) => {

  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  const amountPresets = [4000, 5000, 6000];
  const gramPresets = [0.1, 0.5, 1.0];

  const handleIncrement = () => {
    if (mode === 'amount') {
      onValueChange(value + 1000);
    } else {
      onValueChange(parseFloat((value + 0.1).toFixed(3)));
    }
  };

  const handleDecrement = () => {
    if (mode === 'amount') {
      if (value >= 2000) onValueChange(value - 1000);
    } else {
      if (value >= 0.11) onValueChange(parseFloat((value - 0.1).toFixed(3)));
    }
  };

  const onTabPress = (newMode: 'amount' | 'grams') => {
    if (newMode !== mode) {
      onModeChange(newMode);
      onValueChange(newMode === 'amount' ? 3000 : 0.5);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{t('invest.choose_quantity')}</Text>
          <Text style={styles.subtitle}>{t('invest.min_quantity')}</Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.greenDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, mode === 'amount' && styles.activeTab]}
          onPress={() => onTabPress('amount')}
        >
          <Text
            style={[styles.tabText, mode === 'amount' && styles.activeTabText]}
          >
            {t('invest.amounts')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, mode === 'grams' && styles.activeTab]}
          onPress={() => onTabPress('grams')}
        >
          <Text
            style={[styles.tabText, mode === 'grams' && styles.activeTabText]}
          >
            {t('invest.grams')}
          </Text>
        </TouchableOpacity>
      </View>


      <View style={styles.stepperBox}>
        <TouchableOpacity style={styles.stepBtn} onPress={handleDecrement}>
          <Ionicons name="remove" size={24} color={themeColor.secondary} />
        </TouchableOpacity>

        <View style={styles.valueDisplay}>
          <Text style={styles.valueLabel}>
            {mode === 'amount'
              ? t('invest.price_amount')
              : t('invest.quantity_grams')}
          </Text>
          <View style={styles.valueRow}>
            <Text style={styles.mainValue}>
              {mode === 'amount' ? value.toLocaleString() : value.toFixed(3)}
            </Text>
            <Text style={styles.unitText}>{mode === 'amount' ? '₹' : 'g'}</Text>
          </View>
          <Text style={styles.estimatedText}>
            {t('invest.estimated')}:{' '}
            {mode === 'amount'
              ? `${(value / livePrice).toFixed(3)} g`
              : `₹ ${(value * livePrice).toLocaleString()}`}
          </Text>

        </View>

        <TouchableOpacity
          style={[styles.stepBtn, styles.plusBtn]}
          onPress={handleIncrement}
        >
          <Ionicons name="add" size={24} color={themeColor.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.presetsRow}>
        {(mode === 'amount' ? amountPresets : gramPresets).map(preset => (
          <TouchableOpacity
            key={preset}
            style={styles.presetChip}
            onPress={() => onValueChange(preset)}
          >
            <Text style={styles.presetText}>
              {preset}
              {mode === 'grams' ? ' g' : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.white,
      padding: 20,
      borderRadius: 32,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
      marginTop: 24,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    title: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    subtitle: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 4,
    },
    liveBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: '#F0FDF4',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    greenDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#22C55E',
    },
    liveText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 24,
      marginBottom: 24,
    },
    tab: {
      paddingBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: theme.gold,
    },
    tabText: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
    },
    activeTabText: {
      color: theme.secondary,
    },
    stepperBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.white,
      padding: 8,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: '#FEF3C7',
      marginBottom: 24,
    },
    stepBtn: {
      width: 56,
      height: 56,
      borderRadius: 20,
      backgroundColor: '#F8FAFC',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
    },
    plusBtn: {
      backgroundColor: theme.gold,
    },
    valueDisplay: {
      alignItems: 'center',
      flex: 1,
    },
    valueLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: 6,
      marginTop: 4,
    },
    mainValue: {
      fontSize: fontSize.f28,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    unitText: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    estimatedText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      marginTop: 4,
    },
    presetsRow: {
      flexDirection: 'row',
      gap: 12,
    },
    presetChip: {
      flex: 1,
      height: 48,
      borderRadius: 16,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.grayS3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    presetText: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
  });

export default QuantitySelector;
