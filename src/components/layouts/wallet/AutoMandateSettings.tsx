import React, { useState, useEffect, useMemo } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as types from '@/interface';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import DropDown from '@/components/inputs/Dropdown/Dropdown';
import {
  DAY_OPTIONS,
  DATE_OPTIONS,
  DURATION_OPTIONS,
  TIME_OPTIONS,
} from '@/utils/contant.utils';


interface AutoMandateSettingsProps {
  isVisible: boolean;
  onUpdate: (data: any) => void;
}

const AutoMandateSettings: React.FC<AutoMandateSettingsProps> = ({

  isVisible,
  onUpdate,
}) => {
  const { t } = useTranslation();
  const styles = useThemedStyles(createStyles);
  const themeColor = useThemeColor();

  const [amount, setAmount] = useState('500');
  const [duration, setDuration] = useState('Daily');
  const [time, setTime] = useState('9:00 AM');
  const [day, setDay] = useState('Monday');
  const [date, setDate] = useState('1');

  const durationData = useMemo(() => DURATION_OPTIONS, []);
  const dayData = useMemo(() => DAY_OPTIONS, []);
  const timeData = useMemo(() => TIME_OPTIONS, []);
  const dateData = useMemo(() => DATE_OPTIONS, []);

  useEffect(() => {

    if (!isVisible) {
      setAmount('500');
      setDuration('Daily');
      setTime('9:00 AM');
      setDay('Monday');
      setDate('1');
    }
  }, [isVisible]);


  if (!isVisible) return null;

  return (
    <View style={styles.settingsCard}>
      <Text style={styles.settingsDesc}>{t('wallet.setup_auto_invest')}</Text>

      <Text style={styles.inputLabel}>{t('wallet.amount')}</Text>
      <View style={styles.amountInputBox}>
        <Text style={styles.amountInputSymbol}>₹</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.limitsRow}>
        <Text style={styles.limitText}>MIN ₹100</Text>
        <Text style={styles.limitText}>MAX ₹50,000</Text>
      </View>

      <View style={styles.dropdownItem}>
        <View style={styles.dropdownLabelRow}>
          <Ionicons
            name="time-outline"
            size={20}
            color={themeColor.secondaryS2}
          />
          <Text style={styles.dropdownLabel}>
            {t('wallet.deduction_duration')}
          </Text>
        </View>
        <DropDown
          data={durationData}
          placeHolder={duration}
          defaultValue={duration}
          onSelect={val => {
            setDuration(val);
            if (val === 'Daily') {
              setDay('Monday');
              setDate('1');
            } else if (val === 'Weekly') {
              setDate('1');
            } else if (val === 'Monthly') {
              setDay('Monday');
            }
          }}
          buttonStyle={styles.dropdownValueRow}
          buttonTextStyle={styles.dropdownValue}
          containerStyle={styles.dropContainer}
        />
      </View>

      <View style={styles.dropdownItem}>
        <View style={styles.dropdownLabelRow}>
          <Ionicons
            name="time-outline"
            size={20}
            color={themeColor.secondaryS2}
          />
          <Text style={styles.dropdownLabel}>{t('wallet.deduction_time')}</Text>
        </View>
        <DropDown
          data={timeData}
          placeHolder={time}
          defaultValue={time}
          onSelect={setTime}
          buttonStyle={styles.dropdownValueRow}
          buttonTextStyle={styles.dropdownValue}
          containerStyle={styles.dropContainer}
        />
      </View>

      {duration === 'Weekly' && (
        <View style={styles.dropdownItem}>
          <View style={styles.dropdownLabelRow}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={themeColor.secondaryS2}
            />
            <Text style={styles.dropdownLabel}>
              {t('wallet.deduction_day')}
            </Text>
          </View>
          <DropDown
            data={dayData}
            placeHolder={day}
            defaultValue={day}
            onSelect={setDay}
            buttonStyle={styles.dropdownValueRow}
            buttonTextStyle={styles.dropdownValue}
            containerStyle={styles.dropContainer}
          />
        </View>
      )}

      {duration === 'Monthly' && (
        <View style={styles.dropdownItem}>
          <View style={styles.dropdownLabelRow}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={themeColor.secondaryS2}
            />
            <Text style={styles.dropdownLabel}>
              {t('wallet.deduction_date')}
            </Text>
          </View>
          <DropDown
            data={dateData}
            placeHolder={date}
            defaultValue={date}
            onSelect={setDate}
            buttonStyle={styles.dropdownValueRow}
            buttonTextStyle={styles.dropdownValue}
            containerStyle={styles.dropContainer}
          />
        </View>
      )}


      <TouchableOpacity
        style={styles.updateBtn}
        onPress={() => onUpdate({ amount, duration, time, day, date })}
      >
        <Text style={styles.updateBtnText}>
          {t('wallet.update_mandate_settings')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AutoMandateSettings;

const createStyles = (theme: types.themeType) =>
  StyleSheet.create({
    settingsCard: {
      backgroundColor: theme.white,
      padding: 24,
      borderRadius: 24,
      marginTop: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 15,
      elevation: 4,
    },
    settingsDesc: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
      lineHeight: 20,
      marginBottom: 24,
    },
    inputLabel: {
      fontSize: fontSize.f12,
      fontFamily: fontFamily.bold,
      color: theme.secondaryS2,
      textTransform: 'uppercase',
      marginBottom: 8,
    },
    amountInputBox: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.grayS3,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 16,
      marginBottom: 8,
    },
    amountInputSymbol: {
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      marginRight: 8,
    },
    amountInput: {
      flex: 1,
      fontSize: fontSize.f18,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
      padding: 0,
    },
    limitsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    limitText: {
      fontSize: fontSize.f11,
      fontFamily: fontFamily.medium,
      color: theme.secondaryS2,
    },
    dropdownItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.grayS3,
      padding: 8,
      borderRadius: 16,
      marginBottom: 12,
    },
    dropdownLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    dropdownLabel: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.medium,
      color: theme.secondary,
    },
    dropdownValueRow: {
      backgroundColor: theme.white,
      height: 38,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.grayS2,
      paddingHorizontal: 12,
      // width: '90%',
    },
    dropdownValue: {
      fontSize: fontSize.f13,
      fontFamily: fontFamily.bold,
      color: theme.secondary,
    },
    updateBtn: {
      backgroundColor: theme.secondary,
      paddingVertical: 18,
      borderRadius: 16,
      alignItems: 'center',
      marginTop: 12,
    },
    updateBtnText: {
      fontSize: fontSize.f15,
      fontFamily: fontFamily.bold,
      color: theme.white,
    },
    dropContainer: {
      width: '40%',
    },
  });
