import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TMainStack } from '@/interface/navigation.type';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface';
import { Feather, fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { SimpleHeader, AppBackground } from '@/components';

export default function OrderDetailsScreen() {
  const route = useRoute<RouteProp<TMainStack, 'OrderDetailsScreen'>>();
  const { order } = route.params;
  
  const { t } = useTranslation();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
      case 'PAID':
        return themeColor.grayS2; 
      case 'SHIPPED':
        return themeColor.primary;
      case 'PROCESSING':
      case 'PENDING':
        return themeColor.redS1;
      default:
        return themeColor.grayS2;
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'DELIVERED':
      case 'PAID':
        return themeColor.gray;
      case 'SHIPPED':
        return themeColor.secondary;
      case 'PROCESSING':
      case 'PENDING':
        return themeColor.red;
      default:
        return themeColor.gray;
    }
  };

  const InfoRow = ({ label, value, isLink = false, onLinkPress }: { label: string; value?: string; isLink?: boolean; onLinkPress?: () => void }) => {
    if (!value) return null;
    return (
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        {isLink ? (
          <TouchableOpacity onPress={onLinkPress}>
            <Text style={[styles.infoValue, { color: themeColor.primary, textDecorationLine: 'underline' }]}>{value}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.infoValue}>{value}</Text>
        )}
      </View>
    );
  };

  return (
    <AppBackground backgroundColor={themeColor.backgroundColorS2}>
      <SimpleHeader title={t('order.order_details', 'Order Details')} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* Basic Info Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('order.basic_info', 'Basic Information')}</Text>
          <View style={styles.divider} />
          
          <InfoRow label={t('order.order_id', 'Order ID')} value={`#${order.name}`} />
          <InfoRow 
            label={t('order.date', 'Order Date')} 
            value={new Date(order.processedAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })} 
          />
          <InfoRow label={t('order.total_amount', 'Total Amount')} value={order.totalPrice?.formatted} />
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('order.status_info', 'Status Information')}</Text>
          <View style={styles.divider} />
          
          <View style={styles.statusRow}>
            <Text style={styles.infoLabel}>{t('order.fulfillment_status', 'Fulfillment Status')}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.fulfillmentStatus) }]}>
              <View style={[styles.statusDot, { backgroundColor: getStatusDotColor(order.fulfillmentStatus) }]} />
              <Text style={styles.statusText}>{order.fulfillmentStatus}</Text>
            </View>
          </View>

          <View style={styles.statusRow}>
            <Text style={styles.infoLabel}>{t('order.payment_status', 'Payment Status')}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.financialStatus) }]}>
              <View style={[styles.statusDot, { backgroundColor: getStatusDotColor(order.financialStatus) }]} />
              <Text style={styles.statusText}>{order.financialStatus}</Text>
            </View>
          </View>
        </View>

        {/* Tracking Details Card */}
        {(order.trackingNumber || order.carrier || order.estimatedDelivery || order.statusUrl) && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{t('order.tracking_info', 'Tracking Details')}</Text>
            <View style={styles.divider} />
            
            <InfoRow label={t('order.tracking_number', 'Tracking Number')} value={order.trackingNumber} />
            <InfoRow label={t('order.carrier', 'Carrier')} value={order.carrier} />
            <InfoRow label={t('order.estimated_delivery', 'Estimated Delivery')} value={order.estimatedDelivery} />
            
            {order.statusUrl && (
              <TouchableOpacity 
                style={styles.trackButton} 
                onPress={() => Linking.openURL(order.statusUrl)}
              >
                <Feather name="external-link" size={16} color={themeColor.white} />
                <Text style={styles.trackButtonText}>{t('order.view_tracking_page', 'View Tracking Page')}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

      </ScrollView>
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: wp('5%'),
      paddingTop: hp('2%'),
      paddingBottom: hp('5%'),
    },
    card: {
      backgroundColor: theme.backgroundColorS1,
      borderRadius: 16,
      padding: wp('5%'),
      marginBottom: hp('2%'),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    sectionTitle: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f16,
      color: theme.text,
      marginBottom: hp('1.5%'),
    },
    divider: {
      height: 1,
      backgroundColor: theme.grayS3,
      marginBottom: hp('2%'),
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp('1.5%'),
    },
    infoLabel: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
      color: theme.textS2,
    },
    infoValue: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
      color: theme.text,
    },
    statusRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: hp('1.5%'),
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp('3%'),
      paddingVertical: hp('0.6%'),
      borderRadius: 20,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: wp('1.5%'),
    },
    statusText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f12,
      color: theme.text,
    },
    trackButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingVertical: hp('1.5%'),
      marginTop: hp('2%'),
    },
    trackButtonText: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
      color: theme.white,
      marginLeft: wp('2%'),
    },
  });
