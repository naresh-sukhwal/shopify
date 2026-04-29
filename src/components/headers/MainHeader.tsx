import { themeType } from '@/interface/theme.type';
import { RootState } from '@/store';
import {
  fontSize as fs,
  fontFamily,
  Ionicons,
  MaterialIcons,
} from '@/utils/fontIcon.utils';
import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { IMAGES } from '@/assets';
import { OptionMenuComponent } from '@/components';
import { MenuOptionItem } from '@/components/modal/OptionMenuComponent';
import { useNavigation } from '@react-navigation/native';
import { onLogout } from '@/utils/helper.utils';

interface HeaderProps {
  onProfilePress?: () => void;
}

const MainHeader: React.FC<HeaderProps> = ({ onProfilePress }) => {
  const navigation: any = useNavigation();
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const { walletData } = useSelector(
    (state: RootState) => state.GeneralManager,
  );
  const { user } = useSelector((state: RootState) => state.AuthManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  const sidebarOptions: MenuOptionItem[] = [
    { label: 'Profile', showDivider: true, action: () => {} },
    {
      label: 'Partners',
      renderRight: () => (
        <View style={styles.membershipBadge}>
          <Text style={styles.membershipCode}>CORE</Text>
          <MaterialIcons name="handshake" size={14} color="#B8860B" />
        </View>
      ),
      action: () => navigation.navigate('PartnerFormScreen'),
    },
    { label: 'Social', action: () => navigation.navigate('SocialHome') },
    { label: 'My Bookings', action: () => navigation.navigate('MyBooking') },
    { label: 'Legal', showDivider: true, action: () => {} },
    {
      label: 'Membership',
      renderRight: () => (
        <View style={styles.membershipBadge}>
          <Text style={styles.membershipCode}>CORE</Text>
          <MaterialIcons name="diamond" size={14} color="#B8860B" />
        </View>
      ),
      action: () => navigation.navigate('VIPMembershipScreen'),
    },
    {
      label: 'My Library',
      action: () => navigation.navigate('MyLibraryScreen'),
    },
    { label: 'Ads Center', action: () => {} },
    {
      label: 'Wallet',
      showDivider: true,
      renderRight: () => (
        <View style={styles.walletDisplay}>
          <Ionicons name="cash" size={16} color="#DAA520" />
          <Text style={styles.walletBalance}>{walletData?.walletBalance}</Text>
        </View>
      ),
      action: () => {
        navigation.navigate('MyWallet');
      },
    },
    { label: 'Settings', action: () => {} },
    {
      label: 'Logout',
      action: () => {
        onLogout();
      },
    },
  ];

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
          options={sidebarOptions}
          menuStyle={{ width: 250, marginTop: 10 }}
        />
      </View>

      <TouchableOpacity
        onPress={onProfilePress}
        style={styles.profileContainer}
        activeOpacity={0.8}
      >
        <Image
          source={
            user?.profilePhoto ? { uri: user.profilePhoto } : IMAGES.person
          }
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
      fontFamily: fontFamily.montserratSemiBold,
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
      fontFamily: fontFamily.montserratBold,
    },
    walletDisplay: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    walletBalance: {
      fontSize: fs.f16,
      color: '#4169E1',
      marginLeft: 5,
      fontFamily: fontFamily.montserratMedium,
    },
  });

export default MainHeader;
