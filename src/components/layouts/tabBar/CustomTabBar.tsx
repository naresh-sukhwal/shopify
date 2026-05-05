import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { width } from '@/utils/responsive.utils';
import { themeType } from '@/interface/theme.type';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { TabData } from '@/utils/contant.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        {state?.routes?.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state?.index == index;
          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          const Icon = TabData[index].Icon[0];
          const Label = TabData[index].name;

          return (
            <Pressable key={index} style={styles.tabColumn} onPress={onPress}>
              <View style={[styles.tabItem, isFocused && styles.activeTabItem]}>
                <Icon
                  width={24}
                  height={24}
                  stroke={isFocused ? themeColor.white : themeColor.secondaryS2}
                />
              </View>
              <Text
                style={[
                  styles.label,
                  {
                    color: isFocused
                      ? themeColor.secondary
                      : themeColor.secondaryS2,
                    fontFamily: isFocused ? fontFamily.bold : fontFamily.medium,
                  },
                ]}
              >
                {Label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    tabWrapper: {
      flexDirection: 'row',
      backgroundColor: 'white', // Dark semi-transparent
      width: width * 0.9,
      height: 84,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.7)',
      // Shadow for depth
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
    },
    tabItem: {
      width: 45,
      height: 45,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.white,
    },
    activeTabItem: {
      backgroundColor: theme.secondary, // Light circular background
    },
    label: {
      color: '#2D0C33', // Darker purple from image
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
    },
    tabColumn: {
      alignItems: 'center',
    },
  });
