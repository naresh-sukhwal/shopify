import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CustomButton, CustomModal } from '..';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { themeType } from '@/interface/theme.type';
import { navigateAndSimpleReset } from '@/utils/navigation.utils';
import { onLogout } from '@/utils/helper.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useGeneralStore } from '@/store/generalStore';

type props = {
  visible: boolean;
  onClose: () => void;
};

export default function UnAutheriseModal({ visible, onClose }: props) {
  const { setIsUnAutharized } = useGeneralStore();
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();
  return (
    <CustomModal visibleModel={visible} closeModal={onClose}>
      <View style={{ alignItems: 'center', width: '100%' }}>
        <Ionicons name="close-circle" color={'red'} size={90} />
        <Text style={styles.title}>{'Session Expire!'}</Text>
        <CustomButton
          title="Login"
          onPress={() => {
            onLogout();
            setIsUnAutharized(false);
            setTimeout(() => {
              navigateAndSimpleReset('AuthStack');
            }, 500);
          }}
          style={{ width: '100%' }}
        />
      </View>
    </CustomModal>
  );
}

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    title: {
      fontFamily: fontFamily.bold,
      color: themeColor.red,
      fontSize: fontSize.f24,
    },
  });
