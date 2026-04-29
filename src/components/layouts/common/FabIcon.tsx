import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { MaterialIcons, fontSize } from '@/utils/fontIcon.utils';
import { wp } from '@/utils/responsive.utils';

type FabIconProps = {
  onPress: () => void;
};

export default function FabIcon({ onPress }: FabIconProps) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialIcons name="add" size={fontSize.f30} color={themeColor.white} />
    </TouchableOpacity>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: wp('5%'),
      right: wp('5%'),
      width: wp('14%'),
      height: wp('14%'),
      borderRadius: wp('7%'),
      backgroundColor: '#5C61F4', // Blue color from image
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      zIndex: 999,
    },
  });
