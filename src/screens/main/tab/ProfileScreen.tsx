import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface';
import { Feather, fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { AppBackground } from '@/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { TRootStack } from '@/interface/navigation.type';
import { useAddressStore } from '@/store/addressStore';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);
  const navigation = useNavigation<NavigationProp<TRootStack>>();
  const addresses = useAddressStore(state => state.addresses);

  const ListItem = ({
    icon,
    title,
    isDanger = false,
    showBorder = true,
    onPress,
  }: {
    icon: string;
    title: string;
    isDanger?: boolean;
    showBorder?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.listItem, showBorder && styles.listItemBorder]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.listItemLeft}>
        <View
          style={[styles.iconContainer, isDanger && styles.iconContainerDanger]}
        >
          <Feather
            name={icon}
            size={20}
            color={isDanger ? themeColor.red : themeColor.secondary}
          />
        </View>
        <Text
          style={[styles.listItemText, isDanger && { color: themeColor.red }]}
        >
          {title}
        </Text>
      </View>
      <Feather
        name="chevron-right"
        size={20}
        color={isDanger ? themeColor.red : themeColor.gray}
      />
    </TouchableOpacity>
  );

  return (
    <AppBackground backgroundColor={themeColor.primary}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
              <Feather name="edit-2" size={14} color={themeColor.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.nameText}>Elena Rossi</Text>
          <Text style={styles.emailText}>elena.rossi@aesthetic.com</Text>
        </View>

        {/* Section 1: Details, Orders, Wishlist */}
        <View style={styles.cardContainer}>
          <ListItem icon="user" title={t('profile.profile_details')} />
          <ListItem
            icon="shopping-cart"
            title={t('profile.order_history')}
            onPress={() =>
              navigation.navigate('MainStack', { screen: 'OrderHistoryScreen' })
            }
          />
          <ListItem
            icon="heart"
            title={t('profile.saved_wishlist')}
            onPress={() =>
              navigation.navigate('MainStack', {
                screen: 'TabStack',
                params: { screen: 'WishlistScreen' },
              })
            }
            showBorder={false}
          />
          <ListItem 
            icon="map-pin" 
            title={t('profile.addresses')} 
            onPress={() => {
              if (addresses.length > 0) {
                navigation.navigate('MainStack', { 
                  screen: 'CheckoutAddressScreen', 
                  params: { isFromProfile: true } 
                });
              } else {
                navigation.navigate('MainStack', { screen: 'AddAddressScreen' });
              }
            }}
          />
          {/* <ListItem
            icon="credit-card"
            title={t('profile.payment_methods')}
            showBorder={false}
          /> */}
        </View>

        {/* Section 3: Logout */}
        <View style={styles.cardContainer}>
          <ListItem
            icon="log-out"
            title={t('profile.logout_btn')}
            isDanger
            showBorder={false}
          />
        </View>

        {/* Invite Friends Card */}
        <View style={styles.inviteCard}>
          <Feather
            name="gift"
            size={120}
            color={themeColor.white}
            style={styles.inviteBgIcon}
          />
          <Text style={styles.inviteTitle}>{t('profile.invite_friends')}</Text>
          <Text style={styles.inviteDesc}>{t('profile.invite_desc')}</Text>
          <TouchableOpacity style={styles.inviteBtn} activeOpacity={0.9}>
            <Text style={styles.inviteBtnText}>{t('profile.invite_now')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    scrollContent: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('5%'),
    },
    profileHeader: {
      alignItems: 'center',
      marginTop: hp('4%'),
      marginBottom: hp('3%'),
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: hp('2%'),
    },
    avatar: {
      width: wp('26%'),
      height: wp('26%'),
      borderRadius: wp('13%'),
    },
    editButton: {
      position: 'absolute',
      bottom: 2,
      right: 2,
      backgroundColor: theme.buttonBackground,
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: theme.backgroundColorS2,
    },
    nameText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f22,
      color: theme.textS1,
      marginBottom: hp('0.5%'),
    },
    emailText: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      color: theme.textS2,
    },
    cardContainer: {
      backgroundColor: theme.backgroundColorS1,
      borderRadius: 20,
      marginBottom: hp('2%'),
      paddingHorizontal: wp('5%'),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: hp('2%'),
    },
    listItemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.grayS3,
    },
    listItemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: wp('3%'),
    },
    iconContainerDanger: {
      backgroundColor: theme.redS1,
    },
    listItemText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f16,
      color: theme.text,
    },
    inviteCard: {
      backgroundColor: theme.backgroundColorS3,
      borderRadius: 20,
      padding: wp('5%'),
      marginTop: hp('1%'),
      position: 'relative',
      overflow: 'hidden',
    },
    inviteBgIcon: {
      position: 'absolute',
      right: -20,
      top: -10,
      opacity: 0.15,
      transform: [{ rotate: '15deg' }],
    },
    inviteTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f18,
      color: theme.white,
      marginBottom: hp('1%'),
    },
    inviteDesc: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      color: theme.white,
      opacity: 0.9,
      marginBottom: hp('3%'),
      lineHeight: 20,
      width: '75%',
    },
    inviteBtn: {
      backgroundColor: theme.white,
      paddingVertical: hp('1.2%'),
      paddingHorizontal: wp('6%'),
      borderRadius: 25,
      alignSelf: 'flex-start',
    },
    inviteBtnText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
      color: theme.backgroundColorS3,
    },
  });
