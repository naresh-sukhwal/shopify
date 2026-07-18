import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { themeType } from '@/interface';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { wp, hp } from '@/utils/responsive.utils';
import { getAsyncStorage } from '@/utils/helper.utils';
import { ASYNC_KEYS } from '@/utils/contant.utils';
import {
  navigate,
  navigateAndSimpleReset,
  resetToNestedScreen,
} from '@/utils/navigation.utils';

export default function SplashScreen() {
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  // Animations
  const scaleValue = useRef(new Animated.Value(0.5)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Stylo Text Animation: Start small (zoomed out) and zoom in parallel to time
    Animated.timing(scaleValue, {
      toValue: 1.5,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // 2. Line fill left to right 1.5sec
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false, // Cannot use native driver for width layout animation
    }).start(() => {
      // Once animation is done, handle navigation
      checkInitialNavigation();
    });
  }, []);

  const checkInitialNavigation = async () => {
    navigateAndSimpleReset('MainStack');
  };

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.logoText, { transform: [{ scale: scaleValue }] }]}
      >
        Stylo
      </Animated.Text>

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D26E4B', // Custom orange from screenshot
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f36, // approx 40+ px
      color: theme.white,
      letterSpacing: 1,
    },
    progressContainer: {
      position: 'absolute',
      bottom: hp('10%'),
      width: wp('30%'),
      height: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 1,
      overflow: 'hidden',
    },
    progressBar: {
      height: '100%',
      backgroundColor: theme.white,
    },
  });
