import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AntDesign, fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
import { RootState } from '@/store';

type props = {
  data: Array<{ label: string; value: string }>;
  value: Array<string>;
  onChange: (item: Array<string>) => void;
  placeholder: string;
  label?: string;
  isRequired?: boolean;
  containerStyle?: ViewStyle;
  error?: string;
};

export default function MutliSelectDropdown({
  data,
  value,
  onChange,
  placeholder,
  label,
  isRequired,
  containerStyle,
  error,
}: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  const { t } = useTranslation();
  return (
    <View style={[containerStyle]}>
      {label !== '' && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelStyle}>{label}</Text>
          {isRequired && <Text style={styles.requiredStyle}>*</Text>}
        </View>
      )}
      <MultiSelect
        style={styles.dropdown}
        activeColor={'#e1f5fe'}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        selectedStyle={styles.selectedStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        search
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          onChange(item);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />

      {error && (
        <Text
          style={{ color: 'red', fontSize: 12, marginTop: 3, marginLeft: 5 }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: theme.borderColor,
      backgroundColor: theme.white,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,

      // marginTop: 20,
      // elevation: 3,
      // shadowOffset: {width: 0, height: 2},
      // shadowOpacity: 0.2,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: theme.white,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    selectedStyle: {
      borderRadius: 8,
      backgroundColor: theme.primary,
      fontSize: fontSize.f14,
      borderWidth: 0.5,
      marginTop: 10,
      color: theme.white,
    },
    labelStyle: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.semiBold,
      color: theme.black,
    },
    requiredStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'red',
      marginLeft: 2,
    },
    labelContainer: {
      flexDirection: 'row',
      marginBottom: 8,
    },
  });
