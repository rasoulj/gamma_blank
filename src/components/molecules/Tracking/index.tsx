import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VStack from '../../atoms/VStack';
import Typography from '../../atoms/Typography';
import {
  relativeTime,
  getColor,
  HStack,
  useRoute,
  ShoppingBasket,
} from '../../elemental';
import {useGetShoppingCardHistory, useTracking} from './hook';
import Order from '~/components/organisms/ShoppingBasket';
import TrackingDetail from './TrackingDetail';

const Tracking = () => {
  const route: any = useRoute();

  return (
    <VStack flexGrow={1}>
      {route?.params?.routeName === 'detail' ? (
        <TrackingDetail />
      ) : (
        <Order item={route?.params?.item} headerComponent={<></>} />
      )}
    </VStack>
  );
};

export default Tracking;
