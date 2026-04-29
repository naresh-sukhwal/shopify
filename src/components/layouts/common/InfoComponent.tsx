// InfoComponent.tsx
import { InfoVariant } from '@/interface/general.type';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface InfoComponentProps {
  message: string;
  variant: InfoVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const variantConfig = {
  [InfoVariant.SUCCESS]: {
    icon: 'checkmark-circle-outline',
    color: '#2e7d32',
    background: '#e8f5e9',
  },
  [InfoVariant.INFO]: {
    icon: 'information-circle-outline',
    color: '#0288d1',
    background: '#e1f5fe',
  },
  [InfoVariant.WARNING]: {
    icon: 'warning-outline',
    color: '#f57c00',
    background: '#fff3e0',
  },
  [InfoVariant.ERROR]: {
    icon: 'alert-circle-outline',
    color: '#d32f2f',
    background: '#ffebee',
  },
};

const InfoComponent: React.FC<InfoComponentProps> = ({
  message,
  variant,
  style,
  textStyle,
}) => {
  const config = variantConfig[variant];

  return (
    <View
      style={[styles.container, { backgroundColor: config.background }, style]}
    >
      <Ionicons
        name={config.icon as any}
        size={24}
        color={config.color}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: config.color }, textStyle]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: fontSize.f14,
    fontFamily: fontFamily.montserratMedium,
    width: '90%',
  },
});

export default InfoComponent;
