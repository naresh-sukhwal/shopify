import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import React, { useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { height, width } from '@/utils/responsive.utils';
import {
  fontFamily,
  fontSize,
  MaterialDesignIcons,
} from '@/utils/fontIcon.utils';

type Props = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onPress?: () => void;
};

export default function EmptyListComponent({
  title = 'Nothing Here Yet',
  subtitle = 'Looks like there is no data available right now.',
  buttonText,
  onPress,
}: Props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);

  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entry animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Soft Background Circle */}
        <View style={styles.circle} />

        {/* Animated Icon */}
        <Animated.View
          style={{
            transform: [{ translateY: floatAnim }],
          }}
        >
          <MaterialDesignIcons
            name="database-search-outline"
            size={70}
            color={themeColor.primary}
          />
        </Animated.View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {buttonText && onPress && (
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: height / 1.5,
      paddingHorizontal: 24,
    },
    contentWrapper: {
      alignItems: 'center',
      width: '100%',
    },
    circle: {
      position: 'absolute',
      width: width * 0.5,
      height: width * 0.5,
      borderRadius: width,
      backgroundColor: themeColor.primary + '15',
      top: -30,
    },
    title: {
      marginTop: 20,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f18,
      color: themeColor.text,
    },
    subtitle: {
      marginTop: 8,
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      color: themeColor.gray,
      textAlign: 'center',
      lineHeight: 20,
    },
    button: {
      marginTop: 20,
      backgroundColor: themeColor.primary,
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 25,
    },
    buttonText: {
      color: '#fff',
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
    },
  });
