import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Entypo, fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { fSize } from '@/utils/responsive.utils';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';

type props = {
  count: number;
  onAdd: () => void;
  onLess: () => void;
  btnStyle?: ViewStyle;
};

export default function Counter({ count, onAdd, onLess, btnStyle }: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  return (
    <View style={styles.container}>
      <Pressable onPress={onLess} style={[styles.btn, btnStyle]}>
        <Entypo name="minus" size={fSize(2)} />
      </Pressable>
      <Pressable style={[styles.countBack, btnStyle]}>
        <Text style={styles.count}>{count}</Text>
      </Pressable>
      <Pressable onPress={onAdd} style={[styles.btn, btnStyle]}>
        <Entypo name="plus" size={fSize(2)} />
      </Pressable>
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    btn: {
      borderWidth: 1,
      width: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderColor: theme.primary,
      backgroundColor: theme.white,
    },
    countBack: {
      borderWidth: 1,
      minWidth: 35,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      borderColor: theme.gray,
      marginHorizontal: 10,
    },
    count: {
      fontSize: fontSize.f20,
      color: theme.black,
      fontFamily: fontFamily.montserratSemiBold,
    },
  });
