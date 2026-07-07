import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { themeType } from '@/interface/theme.type';
import FilterIcon from '@/assets/svg/FilterIcon';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';

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
  onSubmitEditing?: () => void;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
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
  onSubmitEditing,
  returnKeyType = 'search',
}: props) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  return (
    <View style={[styles.searchContainer, style]}>
      <Pressable
        style={[
          styles.inputContainer,
          { width: isFilterRequired ? '83%' : '100%' },
        ]}
        onPress={onPress ? onPress : undefined}
      >
        <Ionicons
          name="search"
          size={fontSize.f20}
          color={themeColor.gray}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeHolder}
          style={[styles.input]}
          placeholderTextColor={themeColor.placeHolderColor}
          editable={!disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
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
    searchIcon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: fontSize.f13,
      fontFamily: fontFamily.regular,
      color: themeColor.text,
      height: 50,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      borderRadius: 25,
      paddingHorizontal: 16,
      backgroundColor: themeColor.white, // Made white for new UI
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 2,
    },
  });
