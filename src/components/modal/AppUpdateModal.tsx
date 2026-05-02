import { Linking, Modal, StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { CustomButton } from '..';
import { fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '@/assets';
import { height, width } from '@/utils/responsive.utils';
import VersionCheck from 'react-native-version-check';

type props = {
  visible: boolean;
  onClose: () => void;
};

export default function AppUpdateModal({ visible, onClose }: props) {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  const onPress = async () => {
    try {
      const storeUrl = await VersionCheck.getStoreUrl();
      if (storeUrl) {
        Linking.openURL(storeUrl);
      }
    } catch (error) {
      console.log('first');
    }
  };
  return (
    <Modal
      style={styles.modalView}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      visible={visible}
    >
      <View style={styles.modalView}>
        <View style={[styles.CentredView]}>
          <FastImage
            source={IMAGES.rocket}
            style={styles.image}
            resizeMode={FastImage.resizeMode.stretch}
          />

          <Text style={styles.title}>{'New Update is Available'}</Text>
          <Text style={styles.subtitle}>
            {
              'It seems you are using older app version.\nUpdate for newest features and experience'
            }
          </Text>

          <CustomButton
            title="Update Now"
            onPress={onPress}
            style={{ width: '70%' }}
          />
        </View>
      </View>
    </Modal>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    title: {
      fontFamily: fontFamily.bold,
      color: themeColor.descriptionText,
      fontSize: fontSize.f24,
      marginTop: 20,
    },
    subtitle: {
      fontFamily: fontFamily.medium,
      color: themeColor.lightTextBlack,
      fontSize: fontSize.f16,
      textAlign: 'center',
      marginVertical: 5,
    },
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
      width: '90%',
      backgroundColor: themeColor.backgroundColor,
      borderRadius: 10,
      alignItems: 'center',
      paddingBottom: 30,
    },
    image: {
      width: '100%',
      aspectRatio: 1.8,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
    },
  });
