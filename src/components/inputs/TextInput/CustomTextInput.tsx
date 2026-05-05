import {
  KeyboardTypeOptions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import ErrorText from '@/components/layouts/error/ErrorText';
import { themeType } from '@/interface/theme.type';
import { isRTL } from '@/utils/helper.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';

type params = TextInputProps & {
  name?: string;
  placeholder: string;
  errorMsg?: string;
  label?: string;
  iconName?: string;
  deafultValue?: string;
  mode?: string;
  keyboardType?: KeyboardTypeOptions;
  InputStyle?: TextStyle;
  onChangeText: (e: string) => void;
  isEditable?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  value: string;
  onClose?: () => void;
  isRequired?: boolean;
  labelStyle?: TextStyle;
  leftIconStyle?: TextStyle;
};

export default function CustomTextInput({
  name,
  placeholder,
  errorMsg = '',
  label = '',
  iconName = '',
  deafultValue,
  mode,
  keyboardType,
  InputStyle,
  onChangeText,
  isEditable = true,
  containerStyle,
  style,
  value,
  onClose,
  isRequired = false,
  labelStyle,
  leftIconStyle,
  ...props
}: params) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  const isSecure: boolean =
    (name?.includes('password') ||
      name?.includes('confirmPassword') ||
      name?.includes('password_confirmation')) ??
    false;
  const [isEnable, setIsEnable] = useState<boolean>(isSecure);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[style]}>
      {label !== '' ? (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {isRequired && <Text style={{ color: themeColor.red }}>*</Text>}
        </Text>
      ) : null}
      <View
        style={[
          styles.container,
          {
            marginTop: label !== '' ? 3 : 0,
          },
          containerStyle,
        ]}
      >
        {iconName != '' ? (
          <Ionicons
            name={iconName as any}
            size={fontSize.f24}
            style={[styles.leftIcon, leftIconStyle]}
          />
        ) : null}
        <TextInput
          {...props}
          style={[
            styles.textInput,
            InputStyle,
            {
              color: isEditable
                ? themeColor.black
                : themeColor.placeHolderColor,
            },
          ]}
          value={value}
          placeholder={placeholder}
          defaultValue={deafultValue}
          onChangeText={e => {
            onChangeText(e);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isEnable}
          placeholderTextColor={'grey'}
          keyboardType={keyboardType ?? 'default'}
          editable={isEditable}
        />
        {(name?.includes('password') || name?.includes('confirmPassword')) && (
          <Pressable
            onPress={() => setIsEnable(!isEnable)}
            style={{ width: '10%', alignItems: 'center' }}
          >
            <Ionicons
              name={isEnable ? 'eye' : 'eye-off'}
              size={fontSize.f24}
              color={themeColor.gray}
            />
          </Pressable>
        )}
        {onClose && value?.trim().length > 0 && (
          <Pressable
            onPress={onClose}
            style={{ width: '10%', alignItems: 'center' }}
          >
            <Ionicons
              name={'close-circle-sharp'}
              size={fontSize.f24}
              color={themeColor.gray}
            />
          </Pressable>
        )}
      </View>
      {errorMsg != '' ? <ErrorText errorMsg={errorMsg} /> : null}
    </View>
  );
}

const createStyle = (Colors: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      borderRadius: 8,
      // marginTop: 20,
      paddingHorizontal: 10,
      backgroundColor: Colors.backgroundColor,
      borderColor: Colors.borderColor,
      borderWidth: 1,
      // elevation: 3,
      // shadowOffset: {width: 0, height: 2},
      // shadowOpacity: 0.2,
    },
    textInput: {
      flexGrow: 1,
      width: '80%',
      color: Colors.black,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      height: 50,
      textAlign: isRTL() ? 'right' : 'left',
    },
    label: {
      color: Colors.text,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
      alignSelf: 'flex-start',
      marginLeft: 4,
    },
    leftIcon: { width: '10%', textAlign: 'center', color: Colors.primary },
  });
