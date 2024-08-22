import React, {useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HStack,
  Image,
  Layer,
  LoadIndicator,
  ScrollView,
  Typography,
  VStack,
  getColor,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import useHeader from '~/components/elemental/hooks/use_header';
import {useGetShoppingCardHistory, useTracking} from '../hook';
import useAuthStore from '~/stores/authStore';

let status = {
  ORDERED: '',
  SHIPPED: '',
  DELIVERED: '',
  ON_THE_WAY: '',
};
const TrackingDetail = () => {
  const route: any = useRoute();

  const user = useAuthStore(state => state?.user);
  const {navigateWithName} = useNavigate();
  const {
    data,
    refetch: refetchGetShoppingCardHistory,
    isLoading: isLoadingGetShoppingCardHistory,
  }: any = useGetShoppingCardHistory({
    shoppingCardId: route?.params?.item?.id,
  });
  const {
    data: tracking,
    refetch: refetchTracking,
    isLoading: isLoadingTracking,
  }: any = useTracking({
    shoppingCardSellerId: route?.params?.item?.shoppingCardSellerId,
  });

  useEffect(() => {
    refetchGetShoppingCardHistory();
    refetchTracking();
  }, []);

  const {} = useHeader({
    title: {children: 'Tracking', fontSize: 'md', fontWeight: 'bold'},
    onBack() {
      navigateWithName('track', {item: route?.params?.item});
    },
  });

  const orderDetail = data?.pages?.[0];
  
  const trackingDetail = tracking?.ecommerce_tracking?.result;

  const trackingStatus = useMemo(() => {
    for (let i = 0; i < data?.pages.length; i++) {
      if (data?.pages[i]?.orderStatus) {
        status[data?.pages[i]?.orderStatus] = data?.pages[i]?.createdDate;
      }
    }
    return status;
  }, [data]);

  const Status = [
    {
      id: 1,
      title: 'Ordered',
      createDate: trackingStatus.ORDERED,
      boldIcon: require('../icons/taskBold.png'),
      icon: require('../icons/task.png'),
    },
    {
      id: 2,
      title: 'Shipped',
      createDate: trackingStatus.SHIPPED,
      boldIcon: require('../icons/shipBold.png'),
      icon: require('../icons/ship.png'),
    },
    {
      id: 3,
      title: 'Out for delivery',
      createDate: trackingStatus.DELIVERED,
      boldIcon: require('../icons/truckBold.png'),
      icon: require('../icons/truck.png'),
    },
    {
      id: 4,
      title: `Arriving: ${new Date(
        trackingDetail?.estimatedDeliveryDate ?? undefined,
      ).toLocaleDateString('en-us', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      })}`,
      createDate: trackingStatus.ON_THE_WAY,
      boldIcon: require('../icons/boxBold.png'),
      icon: require('../icons/box.png'),
    },
  ];

  const seller = orderDetail?.shoppingCard?.shoppingCardSellers?.[0]?.seller;

  return (
    <View>
      {isLoadingTracking ? (
        <LoadIndicator />
      ) : (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <Typography style={styles.detailText}>
            Tracking Number:{' '}
            <Typography style={styles.boldText}>
              {trackingDetail?.trackingNumber}
            </Typography>
          </Typography>

          <Typography style={styles.title}>Track the order status</Typography>

          {Status.map((item, index) => {
            return (
              <HStack key={item.id}>
                <VStack alignItems={'center'}>
                  {index !== 0 && <View style={styles.verticalSeparator} />}
                  <View
                    style={[
                      styles.statusIconContainer,
                      {
                        backgroundColor: item?.createDate
                          ? getColor({color: 'primary.400'})
                          : getColor({color: 'background.200'}),
                        borderColor: getColor({color: 'primary.400'}),
                      },
                    ]}>
                    <Image
                      source={item?.createDate ? item.boldIcon : item.icon}
                      resizeMode="contain"
                      style={styles.statusIcon}
                    />
                  </View>
                </VStack>
                <VStack justifyContent={'center'}>
                  <Typography
                    style={[
                      styles.statusTitle,
                      {
                        marginTop: index !== 0 ? 27 : 0,
                      },
                    ]}>
                    {item.title}
                  </Typography>
                  {item?.createDate && (
                    <Typography style={styles.statusDate}>
                      {new Date(item?.createDate).toLocaleDateString('en-us', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'short',
                      })}
                    </Typography>
                  )}
                </VStack>
              </HStack>
            );
          })}
          <Typography style={styles.statusDescriptionText}>
            Status Description:{' '}
            <Typography style={styles.boldText}>
              {trackingDetail?.carrierStatusDescription}
            </Typography>
          </Typography>
          <Typography style={styles.sectionTitle}>Order Details</Typography>
          <Typography style={styles.detailText}>
            Order No:{' '}
            <Typography style={styles.boldText}>
              {orderDetail?.shoppingCardId}
            </Typography>
          </Typography>
          <Typography style={styles.detailText}>
            Order Date:{' '}
            <Typography style={styles.boldText}>
              {new Date(orderDetail?.shoppingCard?.orderDate).toLocaleDateString('en-US', {
                dateStyle: 'short',
              })}
            </Typography>
          </Typography>
          <Typography style={styles.detailText}>
            Time:{' '}
            <Typography style={styles.boldText}>
              {new Date(orderDetail?.shoppingCard?.orderDate).toLocaleTimeString('en-US', {
                timeStyle: 'short',
              })}
            </Typography>
          </Typography>
          <Layer style={styles.buyerImageContainer}>
            {seller?.id === user?.id && (
              <Image
                source={{
                  uri: orderDetail?.shoppingCard?.user?.photoUrl,
                }}
                style={styles.buyerImage}
              />
            )}
            <Typography style={styles.detailText}>
              {seller?.id === user?.id ? 'Buyer Name: ' : 'Seller Name: '}
              <Typography style={styles.boldText}>
                {seller?.id === user?.id
                  ? orderDetail?.shoppingCard?.user?.fullName
                  : orderDetail?.shoppingCard?.shoppingCardSellers?.[0]?.seller
                      ?.fullName}
              </Typography>
            </Typography>
          </Layer>
          <Typography style={styles.detailText}>
            Shipping Address:{' '}
            <Typography style={styles.boldText}>
              {orderDetail?.shoppingCard?.shippingAddress?.aptSuiteBuilding ||
                ''}
              {orderDetail?.shoppingCard?.shippingAddress?.street || ''}{' '}
              {orderDetail?.shoppingCard?.shippingAddress?.state || ''}{' '}
              {orderDetail?.shoppingCard?.shippingAddress?.city || ''}{' '}
              {orderDetail?.shoppingCard?.shippingAddress?.country || ''}
            </Typography>
          </Typography>
        </ScrollView>
      )}
    </View>
  );
};

export default TrackingDetail;

const styles = StyleSheet.create({
  container: {flexGrow: 1, paddingBottom: 60},
  title: {
    marginVertical: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginVertical: 20,
    fontSize: 17,
    fontWeight: 'bold',
  },
  statusDescriptionText: {
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 4,
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    fontWeight: '400',
    marginVertical: 4,
  },
  boldText: {
    fontSize: 14,
    fontWeight: '500',
  },
  verticalSeparator: {
    height: 20,
    width: 2,
    backgroundColor: getColor({color: 'primary.400'}),
  },
  statusIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 100,
    marginHorizontal: 15,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  statusTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  statusDate: {
    fontSize: 13,
    fontWeight: '400',
    color: '#828282',
    marginTop: 3,
  },
  buyerImage: {width: 32, height: 32, borderRadius: 100, marginRight: 8},
  buyerImageContainer:{flexDirection: 'row'}
});
