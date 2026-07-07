import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@/utils/fontIcon.utils';

interface FavoriteButtonProps {
  selected?: boolean;
  onPress: () => void;
  size?: number;
  style?: ViewStyle;
}

export default function FavoriteButton({
  selected = false,
  onPress,
  size = 22,
  style,
}: FavoriteButtonProps) {
  const themeColor = useThemeColor();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, { backgroundColor: themeColor.white }, style]}
    >
      <Ionicons
        name={selected ? 'heart' : 'heart-outline'}
        size={size}
        color={selected ? '#FF4D4F' : '#9B441D'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});
