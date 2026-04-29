import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  View,
} from 'react-native';

interface CustomToggleProps {
  value: boolean;
  onChange: (newValue: boolean) => void;

  // Customization
  width?: number;
  height?: number;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
}

const CustomToggle = ({
  value,
  onChange,
  width = 50,
  height = 30,
  activeColor = '#34C759', // iOS green
  inactiveColor = '#E5E5EA', // iOS gray
  thumbColor = '#FFFFFF',
}: CustomToggleProps) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;

  // Design constants
  const padding = 2;
  const handleSize = height - padding * 2;
  const maxTranslate = width - handleSize - padding * 2;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? maxTranslate : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(bgColor, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, maxTranslate]);

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  return (
    <TouchableWithoutFeedback onPress={() => onChange(!value)}>
      <Animated.View
        style={[
          styles.container,
          {
            width,
            height,
            borderRadius: height / 2,
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: handleSize,
              height: handleSize,
              borderRadius: handleSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 2, // matches padding constant
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
});

export default CustomToggle;
