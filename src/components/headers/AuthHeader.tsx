import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { themeType } from '@/interface/theme.type';
import { Ionicons } from '@/utils/fontIcon.utils';
import { navigateBack } from '@/utils/navigation.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';

type props = {
  title?: string;
  onBackPress?: () => void;
  style?: ViewStyle;
};

export default function AuthHeader({ title, onBackPress, style }: props) {
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  return (
    <View style={[styles.constainer, style]}>
      <Pressable
        style={styles.backButton}
        onPress={onBackPress ? onBackPress : () => navigateBack()}
      >
        <Ionicons name="chevron-back" size={30} color={themeColor.black} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    constainer: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 15,
    },
    title: {
      color: themeColor.text,
    },
    backButton: {
      borderColor: themeColor.borderColor,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 41,
      height: 41,
    },
  });
