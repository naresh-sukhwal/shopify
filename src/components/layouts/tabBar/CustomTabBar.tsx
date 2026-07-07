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
          const isFocused = state?.index === index;
          const onPress = () => {
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          const Icon = TabData[index].Icon[0];
          const Label = TabData[index].name;

          return (
            <Pressable key={index} style={styles.tabItem} onPress={onPress}>
              <View
                style={[styles.tabInner, isFocused && styles.activeTabInner]}
              >
                <Icon
                  width={20}
                  height={20}
                  stroke={isFocused ? themeColor.white : themeColor.secondaryS2}
                />
                {isFocused && (
                  <Text style={styles.activeLabel} numberOfLines={1}>
                    {Label}
                  </Text>
                )}
              </View>
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
      bottom: 12,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    tabWrapper: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundColorS1,
      width: width * 0.88,
      height: 72,
      borderRadius: 36,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      // iOS shadow
      shadowColor: theme.black,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      // Android shadow
      elevation: 8,
    },
    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 999,
      overflow: 'hidden',
    },
    tabInner: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 14,
      overflow: 'hidden',
    },

    activeTabInner: {
      backgroundColor: theme.buttonBackground,
      borderRadius: 999,
    },
    activeLabel: {
      color: theme.white,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
      marginLeft: 2,
    },
  });
