import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import { themeType } from '@/interface/theme.type';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import FilterIcon from '@/assets/svg/FilterIcon';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';

type props = {
  value: string;
  onChangeText: (text: string) => void;
  isFilterRequired?: boolean;
  onFilterPress?: () => void;
  style?: ViewStyle;
  placeHolder?: string;
  disabled?: boolean;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function SearchBox({
  value,
  onChangeText,
  isFilterRequired = false,
  onFilterPress,
  placeHolder = 'Search',
  disabled = false,
  onPress,
  style,
  onFocus,
  onBlur,
}: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  return (
    <View style={[styles.searchContainer, style]}>
      <Pressable
        style={[
          styles.inputContainer,
          { width: isFilterRequired ? '83%' : '100%' },
        ]}
        onPress={onPress ? onPress : undefined}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeHolder}
          style={[styles.input]}
          placeholderTextColor={themeColor.placeHolderColor}
          editable={!disabled}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <Ionicons
          name="search"
          size={fontSize.f24}
          color={themeColor.primary}
        />
      </Pressable>
      {isFilterRequired && (
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <FilterIcon />
        </TouchableOpacity>
      )}
    </View>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    filterButton: {
      backgroundColor: themeColor.backgroundColorS1,
      borderRadius: 8,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
    },
    input: {
      borderRadius: 8,
      padding: 10,
      fontSize: fontSize.f14,
      fontFamily: fontFamily.regular,
      color: themeColor.text,
      width: '90%',
      height: 50,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      borderRadius: 30,
      paddingHorizontal: 10,
      backgroundColor: themeColor.grayS3,
      borderColor: themeColor.grayS1,
    },
  });
