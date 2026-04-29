import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React, { useMemo, useRef, useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
interface DropdownProps {
  data: Array<string> | Array<{}>;
  placeHolder: string;
  onSelect: (item: any) => void;
  error?: string;
  defaultValueIndex?: number;
  labelStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  containerStyle?: ViewStyle;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  isSearchable?: boolean;
}
export default function DropDown({
  data,
  placeHolder,
  onSelect,
  error,
  buttonTextStyle,
  isSearchable = false,
  defaultValue,
  containerStyle,
  label,
  isRequired = false,
  disabled,
  defaultValueIndex,
  labelStyle,
  buttonStyle,
}: DropdownProps) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  const [text, setText] = useState();
  const selectDropdownRef = useRef(null);
  const FLAG_BASE_URL = 'https://flagcdn.com/w320/';
  const { t } = useTranslation();
  const getValue = (item: any) => {
    if (item?.name) {
      return item?.name;
    } else if (item?.label) {
      return item?.label;
    } else if (item?.value) {
      return item?.value;
    } else if (item?.title) {
      return item?.title;
    } else {
      return item;
    }
  };

  return (
    <View style={[containerStyle]}>
      {label !== '' && (
        <View style={styles.labelContainer}>
          <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
          {isRequired && <Text style={styles.requiredStyle}>*</Text>}
        </View>
      )}
      <SelectDropdown
        search
        searchPlaceHolder={t('auth.search')}
        searchPlaceHolderColor={themeColor.placeHolderColor}
        disabled={disabled}
        data={data}
        onSelect={(selectedItem, index) => {
          onSelect(selectedItem);
        }}
        defaultValue={defaultValue}
        defaultValueByIndex={defaultValueIndex}
        renderButton={(selectedItem, isOpened) => {
          return (
            <View style={[styles.dropdownButtonStyle, buttonStyle]}>
              <Text
                style={[
                  styles.dropdownButtonTxtStyle,
                  {
                    color: selectedItem
                      ? themeColor.text
                      : themeColor.placeHolderColor,
                  },
                ]}
              >
                {(selectedItem && getValue(selectedItem)) || placeHolder}
              </Text>
              <Ionicons
                name={isOpened ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={fontSize.f20}
                color={themeColor.gray}
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          const flag =
            item?.code && `${FLAG_BASE_URL}${item?.code.toLowerCase()}.png`;
          return (
            <View
              style={{
                ...styles.dropdownItemStyle,
                ...(isSelected && { backgroundColor: '#D2D9DF' }),
              }}
            >
              <Text style={styles.dropdownItemTxtStyle}>{getValue(item)}</Text>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={styles.dropdownMenuStyle}
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
    dropdownButtonStyle: {
      width: '100%',
      height: 50,
      backgroundColor: theme.backgroundColor,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 14,
      color: theme.text,
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: theme.white,
      borderRadius: 8,
      height: 250,
      marginTop: -50,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
      marginLeft: 10,
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    labelStyle: {
      color: theme.gray,
      fontFamily: fontFamily.montserratSemiBold,
      fontSize: fontSize.f12,
      alignSelf: 'flex-start',
      marginLeft: 4,
    },
    requiredStyle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'red',
      marginLeft: 2,
    },
    labelContainer: {
      flexDirection: 'row',
      marginBottom: 3,
    },
  });
