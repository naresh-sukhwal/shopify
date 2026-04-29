import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { themeType } from '@/interface/theme.type';
import { fontFamily, fontSize, Ionicons } from '@/utils/fontIcon.utils';
import { useNavigationState } from '@react-navigation/native';
import { onLogout } from '@/utils/helper.utils';
import { wp, hp } from '@/utils/responsive.utils';
import { ERoles } from '@/interface';
import { navigate } from '@/utils/navigation.utils';

const userProfile = {
  name: 'Kat Deo',
  image:
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
};

const CustomDrawerContent = ({ navigation }: any) => {
  const { themeColor } = useSelector((state: RootState) => state.ThemeManager);
  const { role } = useSelector((state: RootState) => state.AuthManager);
  const styles = useMemo(() => createStyle(themeColor), [themeColor]);

  const state = useNavigationState((state: any) => state);
  const currentRoute = state?.routes?.[state.index]?.name;

  const isRouteActive = (route: string) => {
    return currentRoute === route;
  };

  const drawerItems = [
    {
      label: 'Profile',
      iconName: 'person-outline',
      screen: 'Profile',
      onPress: () => navigate('Profile' as any),
      roles: [ERoles.COMMUNITY, ERoles.EYES, ERoles.SEEKER],
    },
    {
      label: 'My Gallery',
      iconName: 'document-text-outline',
      screen: 'MyGallary',
      onPress: () => navigation.navigate('MainStack', { screen: 'MyGallary' }),
      roles: [ERoles.SEEKER],
    },
    {
      label: 'My Wallet',
      iconName: 'wallet-outline',
      screen: 'MyWallet',
      onPress: () => navigation.navigate('MainStack', { screen: 'MyWallet' }),
      roles: [ERoles.COMMUNITY, ERoles.EYES, ERoles.SEEKER],
    },
    {
      label: 'My Booking',
      iconName: 'calendar-outline',
      screen: 'MyBooking',
      onPress: () => navigation.navigate('MainStack', { screen: 'MyBooking' }),
      roles: [ERoles.COMMUNITY, ERoles.EYES, ERoles.SEEKER],
    },
    {
      label: 'My Eye',
      iconName: 'eye-outline',
      screen: 'MyEyes',
      onPress: () => navigation.navigate('MainStack', { screen: 'MyEyes' }),
      roles: [ERoles.COMMUNITY],
    },
    {
      label: 'Notification',
      iconName: 'notifications-outline',
      screen: 'Notification',
      onPress: () =>
        navigation.navigate('MainStack', { screen: 'Notification' }),
      roles: [ERoles.COMMUNITY, ERoles.EYES, ERoles.SEEKER],
    },
    {
      label: 'Earn working as an EYE',
      iconName: 'file-tray-stacked-outline',
      screen: 'Earn',
      onPress: () => {},
      roles: [ERoles.SEEKER],
    },
    {
      label: 'Refer a Friend',
      iconName: 'share-social-outline',
      screen: 'Refer',
      onPress: () => {},
      roles: [ERoles.COMMUNITY, ERoles.EYES, ERoles.SEEKER],
    },
    {
      label: 'Legal',
      iconName: 'documents-outline',
      screen: 'Legal',
      onPress: () => {},
      roles: [ERoles.COMMUNITY, ERoles.EYES, ERoles.SEEKER],
    },
    {
      label: 'Logout',
      iconName: 'exit-outline',
      screen: 'Logout',
      onPress: () => onLogout(),
      roles: [ERoles.COMMUNITY, ERoles.EYES, ERoles.SEEKER],
    },
  ];

  const renderIcon = (item: any, isActive: boolean) => {
    const color = themeColor.text;
    const size = 22;

    return <Ionicons name={item.iconName} size={size} color={color} />;
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image source={{ uri: userProfile.image }} style={styles.avatar} />
        <Text style={styles.userName}>Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.menuList}>
        {drawerItems.map((item, index) => {
          const isActive = isRouteActive(item.screen);
          const isRoleActive = item?.roles?.includes(role as any) ?? false;
          return isRoleActive ? (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isActive && styles.activeMenuItem]}
              onPress={item.onPress}
            >
              <View style={styles.iconBox}>{renderIcon(item, isActive)}</View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ) : null;
        })}
      </ScrollView>
    </View>
  );
};

const createStyle = (themeColor: themeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColor.backgroundColorS2,
      paddingTop: hp('6%'),
      paddingHorizontal: wp('5%'),
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: hp('3%'),
      gap: 15,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 16, // Squircle look
      backgroundColor: '#ccc',
    },
    userName: {
      fontSize: fontSize.f20,
      fontFamily: fontFamily.montserratSemiBold,
      color: themeColor.text,
    },
    menuList: {
      flex: 1,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      marginBottom: 5,
      borderRadius: 12,
    },
    activeMenuItem: {
      backgroundColor: themeColor.white,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    iconBox: {
      width: 30,
      alignItems: 'center',
      marginRight: 15,
    },
    menuLabel: {
      fontSize: fontSize.f16,
      fontFamily: fontFamily.montserratMedium,
      color: themeColor.text,
    },
  });

export default CustomDrawerContent;
