import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ViewStyle,
} from 'react-native';
import * as types from '@/interface';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';

import { useTranslation } from 'react-i18next';

interface EnterAmountContainerProps {
  amount: string;
  setAmount: (amount: string) => void;
  quickAmounts?: number[];
  label?: string;
  footerText?: string;
  style?: ViewStyle;
}

const EnterAmountContainer: React.FC<EnterAmountContainerProps> = ({
  amount,
  setAmount,
  quickAmounts = [1000, 2500, 5000, 10000],
  label,
  footerText,
  style,
}) => {
  const styles = useThemedStyles(createStyles);
  const { t } = useTranslation();

  const handleQuickAmount = (val: number) => {
    setAmount(val.toString());
  };

  const handleClear = () => {
    setAmount('');
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label || t('wallet.amount_to_add')}</Text>

      <View style={styles.inputWrapper}>
        <View style={styles.inputContent}>
          <Text style={styles.currencySymbol}>₹</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={styles.placeholder.color}
          />
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>{t('wallet.clear')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quickAmountsRow}>
        {quickAmounts.map(val => (
          <TouchableOpacity
            key={val}
            style={styles.quickAmountButton}
            onPress={() => handleQuickAmount(val)}
          >
            <Text style={styles.quickAmountText}>
              ₹ {val.toLocaleString('en-IN')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.footerText}>
        {footerText || t('wallet.min_amount_info')}
      </Text>
    </View>
  );
};


const createStyles = (themeColor: types.themeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: themeColor.white,
      borderRadius: 32,
      padding: 24,
      shadowColor: themeColor.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    label: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: themeColor.secondaryS2,
      marginBottom: 16,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColor.grayS3,
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 20,
    },
    inputContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    currencySymbol: {
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      color: themeColor.secondary,
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: fontSize.f24,
      fontFamily: fontFamily.bold,
      color: themeColor.secondary,
      padding: 0,
    },
    clearButton: {
      backgroundColor: themeColor.secondary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
    },
    clearText: {
      color: themeColor.white,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
    },
    quickAmountsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 20,
    },
    quickAmountButton: {
      backgroundColor: themeColor.white,
      borderWidth: 1,
      borderColor: themeColor.borderColor,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      flex: 1,
      minWidth: '22%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    quickAmountText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: themeColor.secondary,
    },
    footerText: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.medium,
      color: themeColor.secondaryS2,
      lineHeight: 18,
    },
    placeholder: {
      color: themeColor.grayS1,
    },
  });



export default EnterAmountContainer;
