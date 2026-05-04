import { themeType } from '@/interface/theme.type';
import {
  fontSize as fs,
  fontFamily,
  Ionicons,
  MaterialIcons,
} from '@/utils/fontIcon.utils';
import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { IMAGES } from '@/assets';
import { OptionMenuComponent } from '@/components';
import { MenuOptionItem } from '@/components/modal/OptionMenuComponent';
import { useNavigation } from '@react-navigation/native';
import { onLogout } from '@/utils/helper.utils';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { useThemeColor } from '@/hooks/useThemeColor';

interface HeaderProps {
  onProfilePress?: () => void;
}

const MainHeader: React.FC<HeaderProps> = ({ onProfilePress }) => {
  const navigation: any = useNavigation();
  const styles = useThemedStyles(createStyle);
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <OptionMenuComponent
          button={
            <View style={styles.menuTriggerBtn}>
              <Ionicons name="menu" size={35} color={themeColor.white} />
              <Text style={styles.logoText}>Glimpzik</Text>
            </View>
          }
          triggerWidth={150}
          options={[]}
          menuStyle={{ width: 250, marginTop: 10 }}
        />
      </View>

      <TouchableOpacity
        onPress={onProfilePress}
        style={styles.profileContainer}
        activeOpacity={0.8}
      >
        <Image
          source={IMAGES.person}
          style={styles.profileImage}
          tintColor={themeColor.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      height: 80,
      backgroundColor: 'transparent',
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuTriggerBtn: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoText: {
      color: '#FFFFFF',
      fontSize: fs.f24,
      fontFamily: fontFamily.semiBold,
      marginLeft: 15,
    },
    profileContainer: {
      width: 55,
      height: 55,
      borderRadius: 33,
      borderWidth: 3,
      borderColor: themeColor.secondary,
      overflow: 'hidden',
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImage: {
      width: '80%',
      height: '80%',
      borderRadius: 30,
    },
    // Custom Menu Item Styles
    membershipBadge: {
      alignItems: 'center',
    },
    membershipCode: {
      fontSize: 8,
      color: '#B8860B',
      fontFamily: fontFamily.bold,
    },
    walletDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    walletBalance: {
      fontSize: fs.f16,
      color: '#4169E1',
      marginLeft: 5,
      fontFamily: fontFamily.medium,
    },
  });

export default MainHeader;
