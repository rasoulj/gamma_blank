import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import useAuthStore from '~/stores/authStore';
import {InfiniteScroll, Screen, deviceHeight} from '../../elemental';
import {useGetShoppingCards} from './hook';
import OrderHistoryItem from './OrderHistoryItem';

export default function PastOrderHistory({navigateWithName}) {
  const {user} = useAuthStore();
  const { data, fetchNextPage, hasNextPage}: any =
    useGetShoppingCards({
      where: {
        or: [
          {
            orderStatus: {
              eq: 'DELIVERED',
            },
          },
          {
            orderStatus: {
              eq: 'CANCELLED',
            },
          },
        ],
        ...(user?.userType !== 'OWNER' &&
          user?.userRole !== 'seller' && {
            userId: {
              eq: user?.id,
            },
          }),
        ...(user?.userRole === 'seller' && {
          or: [
            {
              shoppingCardSellers: {
                some: {
                  sellerId: {
                    eq: user?.id,
                  },
                },
              },
            },
            {
              userId: {
                eq: user?.id,
              },
            },
          ],
        }),
      },
      order: {
        createdDate: 'DESC',
      },
    });

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigateWithName('track', {item: item})}>
        {item && <OrderHistoryItem type="past" item={item} />}
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <InfiniteScroll
        bounces={false}
        contentContainerStyle={styles?.contentContainer}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        data={data?.pages}
        renderItem={renderItem}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    minHeight:deviceHeight,
    paddingHorizontal: 5,
    marginTop: 20,
    paddingBottom: 140,
  },
  container: {
    flex: 1,
  },
});
