import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import { navigateBack } from '@/utils/navigation.utils';
import { fontFamily, fontSize, MaterialIcons } from '@/utils/fontIcon.utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';

interface StackHeaderProps {
  title?: string;
  onBackPress?: () => void;
  titleColor?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: TextStyle;
  showBackIcon?: boolean;
}

export default function StackHeader({
  title = '',
  onBackPress,
  titleColor = '#333',
  style,
  titleStyle,
  showBackIcon = true,
}: StackHeaderProps) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  return (
    <View style={[styles.headerContainer, style]}>
      {showBackIcon && (
        <MaterialIcons
          name="arrow-back"
          size={28}
          color={themeColor.text}
          onPress={onBackPress ? onBackPress : () => navigateBack()}
        />
      )}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {showBackIcon && <View style={styles.rightSpace} />}
    </View>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 16,
      backgroundColor: themeColor.backgroundColor,
    },
    backButton: {
      width: 40,
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: 'white',
    },
    title: {
      textAlign: 'center',
      fontSize: fontSize.f16,
      fontFamily: fontFamily.montserratBold,
      color: themeColor.text,
      marginLeft: 10,
    },
    rightSpace: {
      width: 40,
    },
  });
