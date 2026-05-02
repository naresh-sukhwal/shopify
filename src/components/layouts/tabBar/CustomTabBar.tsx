import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { Ionicons } from '@/utils/fontIcon.utils';
import { width } from '@/utils/responsive.utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { ERoles } from '@/interface/general.type';
import { SeekerTabData } from '@/utils/contant.utils';
import { SVG } from '@/assets';

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  const [showCameraPopup, setShowCameraPopup] = useState(false);

  return (
    <View style={styles.container}>
      {showCameraPopup && (
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Pressable
              style={styles.popupItem}
              onPress={() => {
                setShowCameraPopup(false);
              }}
            >
              <SVG.VideoIcon width={26} height={26} fill="#2D0C33" />
              <Text style={styles.popupText}>Livestream</Text>
            </Pressable>
            <Pressable
              style={styles.popupItem}
              onPress={() => {
                setShowCameraPopup(false);
              }}
            >
              <SVG.MicIcon width={26} height={26} fill="#2D0C33" />
              <Text style={styles.popupText}>Podcast</Text>
            </Pressable>
          </View>
          <View style={styles.triangle} />
        </View>
      )}
      <View style={styles.tabWrapper}>
        {state?.routes?.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state?.index == index;
          const onPress = () => {
            if (index === 2) {
              setShowCameraPopup(!showCameraPopup);
              return;
            }
            setShowCameraPopup(false);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = SeekerTabData[index].Icon[0];

          return (
            <Pressable
              key={index}
              onPress={onPress}
              style={[styles.tabItem, isFocused && styles.activeTabItem]}
            >
              <Icon
                width={24}
                height={24}
                fill={isFocused ? themeColor.white : 'rgba(255,255,255,0.6)'}
              />
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
      bottom: 30,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    tabWrapper: {
      flexDirection: 'row',
      backgroundColor: 'rgba(13, 13, 13, 0.6)', // Dark semi-transparent
      width: width * 0.9,
      height: 61,
      borderRadius: 40,
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
      borderRadius: 27.5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.white,
    },
    activeTabItem: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light circular background
    },
    popupContainer: {
      position: 'absolute',
      bottom: 65, // Moved closer to tab bar
      alignItems: 'center',
      zIndex: 100,
    },
    popupContent: {
      backgroundColor: theme.white,
      flexDirection: 'row',
      borderRadius: 50, // More pill-shaped
      paddingVertical: 10,
      paddingHorizontal: 30,
      gap: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
    },
    popupItem: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
    },
    popupText: {
      color: '#2D0C33', // Darker purple from image
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f12,
    },
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 12,
      borderRightWidth: 12,
      borderTopWidth: 12,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: theme.white,
      marginTop: -1,
    },
  });
