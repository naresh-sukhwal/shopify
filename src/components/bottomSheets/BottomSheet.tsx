import React, { useMemo } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useTranslation } from 'react-i18next';
import { height } from '@/utils/responsive.utils';
import SafeAreaWrapper from '../hoc/SafeAreaWrapper';

type Props = {
  sheetRef: any;
  sheetHeight?: number;
  children: React.ReactNode;
  backgroundColor?: string;
  draggable?: boolean;
};

const BottomSheet: React.FC<Props> = ({
  sheetRef,
  children,
  sheetHeight = height / 3,
  backgroundColor = 'white',
  draggable = true,
}) => {
  const { t } = useTranslation();

  return (
    <RBSheet
      ref={sheetRef}
      height={sheetHeight}
      closeOnPressMask
      closeOnPressBack
      draggable={draggable}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.7)',
        },
        draggableIcon: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        container: {
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          backgroundColor: backgroundColor,
        },
      }}
    >
      <SafeAreaWrapper style={{ ...styles.container, backgroundColor }}>
        {children}
      </SafeAreaWrapper>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default BottomSheet;
