import React, { useMemo } from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { themeType } from '@/interface/theme.type';

export interface MenuOptionItem {
  label: string;
  action?: () => void;
  icon?: React.ReactNode;
  showDivider?: boolean;
  disabled?: boolean;
  renderRight?: () => React.ReactNode;
  isDelete?: boolean;
}

type Props = {
  button?: any; // trigger content: string or element
  buttonStyle?: ViewStyle | TextStyle | any;
  options: MenuOptionItem[];
  menuStyle?: ViewStyle;
  triggerWidth?: number;
};

export default function OptionMenuComponent({
  button,
  buttonStyle,
  options = [],
  menuStyle,
  triggerWidth = 32,
}: Props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  return (
    <Menu>
      <MenuTrigger style={{ width: triggerWidth, alignItems: 'center' }}>
        {typeof button === 'string' ? (
          <Text style={buttonStyle}>{button}</Text>
        ) : button ? (
          button
        ) : (
          <Ionicons
            name="ellipsis-vertical"
            size={25}
            color={themeColor.white}
          />
        )}
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: [styles.menuContainer, menuStyle],
        }}
      >
        {options?.map((option, index) => (
          <React.Fragment key={index}>
            <MenuOption
              onSelect={option.action}
              disabled={option.disabled}
              style={styles.menuOption}
            >
              <View style={styles.optionRow}>
                <View style={styles.leftContent}>
                  {option.icon && (
                    <View style={styles.iconContainer}>{option.icon}</View>
                  )}
                  <View>
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: option.disabled
                            ? themeColor.grayS1
                            : option.isDelete
                              ? themeColor.red
                              : themeColor.text,
                        },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                </View>

                {option.renderRight && (
                  <View style={styles.rightContent}>
                    {option.renderRight()}
                  </View>
                )}
              </View>
            </MenuOption>
            {option.showDivider && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </MenuOptions>
    </Menu>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    menuContainer: {
      borderRadius: 16,
      padding: 5,
      marginTop: 5,
      backgroundColor: '#FFFFFF',
      width: 200,
      // Premium shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.1,
      shadowRadius: 20,
      elevation: 5,
    },
    menuOption: {
      paddingVertical: 12,
      paddingHorizontal: 15,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      marginRight: 12,
      width: 24,
      alignItems: 'center',
    },
    rightContent: {
      marginLeft: 10,
    },
    optionText: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.medium,
      color: '#000000',
    },
    divider: {
      height: 1,
      backgroundColor: 'rgba(0,0,0,0.1)',
      marginHorizontal: 15,
    },
  });
