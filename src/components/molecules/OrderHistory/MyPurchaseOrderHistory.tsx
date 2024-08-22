import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import useAuthStore from '~/stores/authStore';
import {InfiniteScroll, deviceHeight} from '../../elemental';
import OrderHistoryItem from './OrderHistoryItem';
import {useGetShoppingCards} from './hook';

export default function MyPurchaseOrderHistory({navigateWithName}) {
  const {user} = useAuthStore();

  const {data, fetchNextPage, hasNextPage}: any = useGetShoppingCards({
    where: {
      ...(user?.userType !== 'OWNER' && {
        userId: {
          eq: user?.id,
        },
      }),
    },
    order: {
      createdDate: 'DESC',
    },
  });

  
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigateWithName('track', {item: item})}>
        {item && <OrderHistoryItem type="current" item={item} />}
      </TouchableOpacity>
    );
  };

  return (
    <InfiniteScroll
      bounces={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      data={data?.pages}
      renderItem={renderItem}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    minHeight: deviceHeight,
    paddingHorizontal: 5,
    marginTop: 20,
    paddingBottom: 140,
  },
  container: {
    flex: 1,
  },
});
