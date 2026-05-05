import { Modal, StyleSheet, View } from 'react-native';
import React from 'react';
import { themeType } from '@/interface/theme.type';
import { height, width } from '@/utils/responsive.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
type props = {
  closeModal: () => void;
  visibleModel: boolean;
  children: React.ReactNode;
};

export default function PopUpModal({
  closeModal,
  visibleModel,
  children,
}: props) {
  const styles = useThemedStyles(createStyle);
  return (
    <Modal
      style={styles.modalView}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
      visible={visibleModel}
    >
      <View style={styles.modalView}>
        <View style={[styles.CentredView]}>{children}</View>
      </View>
    </Modal>
  );
}

const createStyle = (theme: themeType) =>
  StyleSheet.create({
    modalView: {
      minHeight: 80,
      width: width,
      height: height,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 10,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
    },
    CentredView: {
      width: '85%',
      backgroundColor: theme.backgroundColor,
      borderRadius: 10,
      padding: 25,
    },
  });
