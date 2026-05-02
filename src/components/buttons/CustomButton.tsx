import {
  ActivityIndicator,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';

interface props {
  title: string;
  activeOpacity?: number;
  loading?: boolean;
  disable?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  icon?: boolean;
  img?: any;
  isGradiantRequired?: boolean;
}

export default function CustomButton({
  title,
  activeOpacity = 0.8,
  loading = false,
  disable = false,
  style,
  textStyle,
  onPress,
  icon,
  img,
  isGradiantRequired = true,
}: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  const isDisabled = useMemo(() => {
    return disable || loading;
  }, [disable, loading]);

  return isGradiantRequired ? (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      disabled={isDisabled}
    >
      <LinearGradient
        style={[styles.container, style]}
        colors={[themeColor.secondary, themeColor.secondaryS1, themeColor.secondaryS2]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        {loading ? (
          <ActivityIndicator size={30} color={themeColor.white} />
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[styles.container, style]}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size={30} color={themeColor.white} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {img && <Image source={img} style={{ marginRight: 10 }} />}

          <Text style={[styles.text, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      height: 50,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      backgroundColor: theme.primary,
    },
    text: {
      color: theme.white,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  });
