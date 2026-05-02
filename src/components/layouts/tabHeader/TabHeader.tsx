import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';

type props = {
  tabData: Array<{ label: string; value: string }>;
  onTabChange: (value: string) => void;
  currentTab: string;
  variant?: 'underline' | 'pill';
};

export default function TabHeader({
  tabData,
  onTabChange,
  currentTab,
  variant = 'underline',
}: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  // Pill Container Style
  const containerStyle =
    variant === 'pill'
      ? styles.pillContainer
      : { flexDirection: 'row' as 'row' };

  return (
    <View style={containerStyle}>
      {tabData.map((item, index) => {
        const isSelected = currentTab === item.value;

        if (variant === 'pill') {
          return (
            <Pressable
              key={index}
              onPress={() => onTabChange(item.value)}
              style={[
                styles.pillTab,
                {
                  backgroundColor: isSelected ? '#5C6AFF' : 'transparent', // Match design blue
                },
              ]}
            >
              <Text
                style={[
                  styles.pillText,
                  { color: isSelected ? themeColor.white : '#5C6AFF' },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }

        // Default Underline Style
        return (
          <Pressable
            key={index}
            onPress={() => onTabChange(item.value)}
            style={[
              styles.tab,
              {
                borderColor: isSelected
                  ? themeColor.primary
                  : themeColor.grayS2,
              },
            ]}
          >
            <Text
              style={[
                styles.tabText,
                { color: isSelected ? themeColor.primary : themeColor.black },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    tab: {
      width: '33.33%',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomWidth: 3,
    },
    tabText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.bold,
    },
    // Pill Styles
    pillContainer: {
      flexDirection: 'row',
      backgroundColor: '#F5F6FF', // Light blue/gray bg from image
      borderRadius: 25,
      padding: 5,
      justifyContent: 'space-between',
      marginHorizontal: 10,
      marginVertical: 10,
    },
    pillTab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 20,
    },
    pillText: {
      fontSize: fontSize.f14,
      fontFamily: fontFamily.semiBold,
    },
  });
