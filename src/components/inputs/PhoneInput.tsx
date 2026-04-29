import React, { useRef } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { fontSize, fontFamily, MaterialIcons } from '@/utils/fontIcon.utils';
import { ICountry } from '@/utils/countryData';
import CountryPickerSheet from '@/components/bottomSheets/CountryPickerSheet';

interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  selectedCountry: ICountry;
  onSelectCountry: (country: ICountry) => void;
  errorMsg?: string;
  placeholder?: string;
  containerStyle?: ViewStyle;
  editable?: boolean;
  inputWrapperStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  selectedCountry,
  onSelectCountry,
  errorMsg,
  placeholder = 'Mobile number',
  containerStyle,
  editable = true,
  inputWrapperStyle,
  label,
  labelStyle,
}) => {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = createStyle(themeColor);
  const countrySheetRef = useRef<any>(null); // Ref for BottomSheet

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        {/* Country Picker Trigger */}
        <TouchableOpacity
          style={styles.countryButton}
          onPress={() => countrySheetRef.current?.open()}
          activeOpacity={0.7}
        >
          <Text style={styles.flagText}>{selectedCountry?.flag}</Text>
          <Text style={styles.dialCodeText}>{selectedCountry?.dialCode}</Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24} // Slightly larger for better touch target
            color={themeColor.text}
          />
        </TouchableOpacity>

        {/* Separator - Exact match: Vertical line */}
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
        </View>

        {/* Phone Input */}
        <View style={styles.textInputContainer}>
          <MaterialIcons
            name="local-phone"
            size={20}
            color={themeColor.textS2}
            style={styles.icon}
          />
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor={themeColor.textS2}
            value={value}
            onChangeText={onChangeText}
            keyboardType="phone-pad"
            maxLength={15}
            editable={editable}
          />
        </View>
      </View>
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {/* Country Picker Sheet */}
      <CountryPickerSheet
        sheetRef={countrySheetRef}
        onSelect={onSelectCountry}
        selectedCountry={selectedCountry}
      />
    </View>
  );
};

export default PhoneInput;

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1.5, // slightly thicker for prominence
      borderColor: theme.primary, // Exact color match
      borderRadius: 12,
      backgroundColor: theme.backgroundColor,
      height: 56, // Standard height
      overflow: 'hidden',
    },
    countryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      height: '100%',
    },
    flagText: {
      fontSize: 24,
      marginRight: 6,
      color: theme.text,
    },
    dialCodeText: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.montserratMedium,
      color: theme.text,
      marginRight: 4,
    },
    separatorContainer: {
      height: '60%',
      justifyContent: 'center',
    },
    separator: {
      width: 1,
      height: '100%',
      backgroundColor: theme.textS2, // Color for separator, using textS2 for subtle grey
      opacity: 0.5,
      marginHorizontal: 0,
    },
    textInputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      height: '100%',
    },
    icon: {
      marginRight: 8,
    },
    textInput: {
      flex: 1,
      fontSize: fontSize.f16,
      fontFamily: fontFamily.montserratMedium,
      color: theme.text,
      height: '100%',
    },
    errorText: {
      color: theme.red,
      fontSize: fontSize.f12,
      fontFamily: fontFamily.montserratRegular,
      marginTop: 4,
      marginLeft: 4,
    },
    label: {
      color: theme.text,
      fontFamily: fontFamily.montserratSemiBold,
      fontSize: fontSize.f16,
      alignSelf: 'flex-start',
      marginLeft: 4,
    },
  });
