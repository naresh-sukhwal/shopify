import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useMemo, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatDate } from '@/utils/helper.utils';
import { fSize } from '@/utils/responsive.utils';
import { fontFamily, Fontisto, fontSize } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';

type props = {
  date: Date | undefined;
  placeHolder: string;
  onConfirm: (date: string) => void;
  label: string;
  CustomStyle?: ViewStyle;
  errorMsg?: string;
  mode?: 'date' | 'time' | 'datetime';
  style?: ViewStyle;
};

export default function DateTimeInput({
  date,
  placeHolder,
  onConfirm,
  label = '',
  CustomStyle,
  errorMsg,
  style,
  mode = 'date',
}: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  const [open, setOpen] = useState(false);
  return (
    <View style={[styles.containerStyle, style]}>
      {label !== '' ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        style={[styles.Container, CustomStyle]}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[styles.text, { color: date == undefined ? 'grey' : 'black' }]}
        >
          {date != undefined
            ? formatDate(date, mode === 'time' ? 'hh:mm A' : 'DD/MM/YYYY')
            : placeHolder}
        </Text>
        <Fontisto name="date" size={fSize(3)} color={themeColor.gray} />
      </Pressable>
      {errorMsg != '' && (
        <Text
          style={{
            color: themeColor.red,
            fontSize: fontSize.f12,
            marginLeft: 5,
            marginTop: 2,
            alignSelf: 'flex-start',
          }}
        >
          {errorMsg}
        </Text>
      )}
      <DateTimePickerModal
        isVisible={open}
        mode={mode}
        onConfirm={date => {
          onConfirm(date.toString());
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
        minimumDate={new Date()}
      />
    </View>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    containerStyle: {
      width: '100%',
    },
    Container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 51,
      borderRadius: 7,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    text: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
    },
    label: {
      color: theme.text,
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
      alignSelf: 'flex-start',
      marginTop: 15,
    },
  });
