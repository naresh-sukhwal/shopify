import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { CustomModal } from '..';
import { fontFamily, fontSize, MaterialIcons } from '@/utils/fontIcon.utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';

type props = {
  visible: boolean;
  onClose: () => void;
};

export default function InternetModal({ visible, onClose }: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);
  return (
    <CustomModal visibleModel={visible} closeModal={onClose}>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <MaterialIcons name="network-check" color={'red'} size={150} />
        <Text style={styles.title}>{'Oh No!'}</Text>
        <Text style={styles.subtitle}>
          {'No internet connection found.\nCheck your connection and try agian'}
        </Text>
      </View>
    </CustomModal>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    title: {
      fontFamily: fontFamily.bold,
      color: themeColor.gray,
      fontSize: fontSize.f28,
    },
    subtitle: {
      fontFamily: fontFamily.medium,
      color: themeColor.lightTextBlack,
      fontSize: fontSize.f16,
      textAlign: 'center',
    },
  });
