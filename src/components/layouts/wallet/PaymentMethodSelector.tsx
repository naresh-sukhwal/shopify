import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as types from '@/interface';
import { fontFamily, fontSize, Ionicons, MaterialIcons } from '@/utils/fontIcon.utils';
import LinearGradient from 'react-native-linear-gradient';

export type PaymentMethod = 'UPI' | 'BANK';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
}) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  const renderCard = (id: PaymentMethod, iconName: string, titleKey: string, descKey: string) => {
    const isSelected = selectedMethod === id;

    const Content = (
      <>
        <View style={styles.cardTop}>
          <View style={styles.iconBox}>
            <MaterialIcons name={iconName as any} size={24} color={themeColor.secondary} />
          </View>
          {isSelected ? (
            <Ionicons name="checkmark-circle" size={20} color={themeColor.secondary} />
          ) : (
            <View style={styles.radioUnselected} />
          )}
        </View>
        <View>
          <Text style={styles.paymentName}>{t(titleKey)}</Text>
          <Text style={styles.paymentDesc}>{t(descKey)}</Text>
        </View>
      </>
    );

    if (isSelected) {
      return (
        <Pressable style={styles.paymentCardWrapper} onPress={() => onSelect(id)}>
          <LinearGradient
            colors={['#FDE68A', '#FEF9E7']}
            style={styles.paymentCard}
          >
            {Content}
          </LinearGradient>
        </Pressable>
      );
    }

    return (
      <Pressable
        style={styles.paymentCardWrapper}
        onPress={() => onSelect(id)}
      >
        <View style={styles.paymentCardUnselected}>
          {Content}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.paymentRow}>
      {renderCard('UPI', 'qr-code-scanner', 'wallet.upi', 'wallet.upi_desc')}
      {renderCard('BANK', 'account-balance', 'wallet.bank_transfer', 'wallet.bank_transfer_desc')}
    </View>
  );
};

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    paymentRow: {
      flexDirection: 'row',
      gap: 12,
    },
    paymentCardWrapper: {
      flex: 1,
    },
    paymentCard: {
      borderRadius: 24,
      padding: 16,
      height: 125,
      justifyContent: 'space-between',
    },
    paymentCardUnselected: {
      borderRadius: 24,
      padding: 16,
      height: 125,
      justifyContent: 'space-between',
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: theme.grayS3,
    },
    cardTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    iconBox: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: theme.white,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    radioUnselected: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1.5,
      borderColor: theme.grayS1,
    },
    paymentName: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginTop: 8,
    },
    paymentDesc: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
  });

export default PaymentMethodSelector;
