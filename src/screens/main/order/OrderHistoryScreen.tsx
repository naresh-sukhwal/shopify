import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SimpleHeader, AppBackground, PageLoading, EmptyListComponent } from '@/components';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useThemedStyles } from '@/hooks/useThemedStyles';
import { themeType } from '@/interface';
import { Feather, fontFamily, fontSize } from '@/utils/fontIcon.utils';
import { hp, wp } from '@/utils/responsive.utils';
import { useShopifyAuthStore } from '@/store/shopifyAuthStore';
import { getCustomer } from '@/api/services/customer.service';
import type { CustomerOrder } from '@/types/app.types';
import { useRoute, RouteProp, useNavigation, NavigationProp } from '@react-navigation/native';
import { TRootStack, TMainStack } from '@/interface/navigation.type';

export default function OrderHistoryScreen() {
  const route = useRoute<RouteProp<TMainStack, 'OrderHistoryScreen'>>();
  const navigation = useNavigation<NavigationProp<TRootStack>>();
  const { t } = useTranslation();
  const themeColor = useThemeColor();
  const styles = useThemedStyles(createStyles);

  const [activeTab, setActiveTab] = useState('All');
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const customerAccessToken = useShopifyAuthStore(s => s.customerAccessToken);

  React.useEffect(() => {
    async function fetchOrders() {
      // If orders were passed as route params (e.g. Guest Tracking), use them immediately
      if (route.params?.orders) {
        setOrders(route.params.orders);
        setLoading(false);
        return;
      }

      if (!customerAccessToken) {
        setLoading(false);
        return;
      }
      try {
        const customer = await getCustomer(customerAccessToken);
        if (customer) {
          setOrders(customer.orders);
        }
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [customerAccessToken, route.params?.orders]);

  const tabs = [
    { key: 'All', label: t('order.all') },
    { key: 'Processing', label: t('order.processing') },
    { key: 'Shipped', label: t('order.shipped') },
    { key: 'Delivered', label: t('order.delivered') },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return themeColor.grayS2; // Adjust if you have a specific success color
      case 'SHIPPED':
        return themeColor.primary;
      case 'PROCESSING':
        return themeColor.redS1; // Assuming it maps to a light red/pink
      default:
        return themeColor.grayS2;
    }
  };

  const getStatusDotColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return themeColor.gray;
      case 'SHIPPED':
        return themeColor.secondary;
      case 'PROCESSING':
        return themeColor.red;
      default:
        return themeColor.gray;
    }
  };

  return (
    <AppBackground backgroundColor={themeColor.backgroundColorS2}>
      <SimpleHeader title={t('profile.order_history')} />

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          {tabs.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  isActive
                    ? { backgroundColor: themeColor.secondary }
                    : { backgroundColor: themeColor.backgroundColorS3 },
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                <Text
                  style={[
                    styles.tabText,
                    isActive
                      ? {
                          color: themeColor.backgroundColorS1,
                          fontFamily: fontFamily.bold,
                        }
                      : { color: themeColor.textS1 },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {loading ? (
        <PageLoading />
      ) : orders.length === 0 ? (
        <EmptyListComponent
          title={t('order.no_orders', 'No orders found')}
          subtitle={t('order.start_shopping', 'Start shopping to see your orders here.')}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        >
          {orders.map((order, index) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderId}>ORDER {order.name}</Text>
                  <Text style={styles.orderDate}>
                    {new Date(order.processedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(order.fulfillmentStatus || order.financialStatus) },
                  ]}
                >
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getStatusDotColor(order.fulfillmentStatus || order.financialStatus) },
                    ]}
                  />
                  <Text style={styles.statusText}>{order.fulfillmentStatus || order.financialStatus}</Text>
                </View>
              </View>

            <View style={styles.orderFooter}>
              <View style={styles.imagesContainer}>
                {order.images.map((img, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.imageWrapper,
                      {
                        zIndex: order.images.length - idx,
                        marginLeft: idx > 0 ? -15 : 0,
                      },
                    ]}
                  >
                    <Image source={{ uri: img }} style={styles.productImage} />
                  </View>
                ))}
                {order.extraCount > 0 && (
                  <View
                    style={[
                      styles.imageWrapper,
                      styles.extraCountWrapper,
                      { zIndex: 0, marginLeft: -15 },
                    ]}
                  >
                    <Text style={styles.extraCountText}>
                      +{order.extraCount}
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={() => navigation.navigate('MainStack', { screen: 'OrderDetailsScreen', params: { order } })}
              >
                <Text style={styles.detailsButtonText}>
                  {t('order.view_details')}
                </Text>
                <Feather
                  name="chevron-right"
                  size={14}
                  color={themeColor.red}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      )}
    </AppBackground>
  );
}

const createStyles = (theme: themeType) =>
  StyleSheet.create({
    tabsContainer: {
      marginTop: hp('1%'),
      marginBottom: hp('2%'),
    },
    tabsScrollContent: {
      paddingHorizontal: wp('5%'),
      gap: 10,
    },
    tabButton: {
      paddingHorizontal: wp('5%'),
      paddingVertical: hp('1%'),
      borderRadius: 20,
    },
    tabText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
    },
    listContainer: {
      paddingHorizontal: wp('5%'),
      paddingBottom: hp('5%'),
      gap: hp('2%'),
    },
    orderCard: {
      backgroundColor: theme.backgroundColorS1,
      borderRadius: 20,
      padding: wp('5%'),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 2,
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: hp('2%'),
    },
    orderId: {
      fontFamily: fontFamily.semiBold,
      fontSize: fontSize.f14,
      color: theme.textS1,
      marginBottom: 2,
    },
    orderDate: {
      fontFamily: fontFamily.regular,
      fontSize: fontSize.f14,
      color: theme.textS2,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      gap: 4,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
    },
    statusText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f10,
      color: theme.textS1,
    },
    orderFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    imagesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageWrapper: {
      width: 50,
      height: 50,
      borderRadius: 10,
      backgroundColor: theme.backgroundColorS2,
      borderWidth: 2,
      borderColor: theme.backgroundColorS1,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    extraCountWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundColorS3,
    },
    extraCountText: {
      fontFamily: fontFamily.medium,
      fontSize: fontSize.f14,
      color: theme.textS1,
    },
    detailsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    detailsButtonText: {
      fontFamily: fontFamily.bold,
      fontSize: fontSize.f14,
      color: theme.red,
    },
  });
