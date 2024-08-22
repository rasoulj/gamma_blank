import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import useAuthStore from '~/stores/authStore';
import {InfiniteScroll, Screen, deviceHeight} from '../../elemental';
import {useGetShoppingCards} from './hook';
import MySellsOrderItem from './MySellsOrderitem';

export default function MySellsOrderHistory({navigateWithName}) {
  const {user} = useAuthStore();

  const { data, fetchNextPage, hasNextPage}: any =
    useGetShoppingCards({
      where: {
        shoppingCardSellers: {
          some: {
            sellerId: {
              eq: user?.id,
            },
          },
        },
      },
      order: {
        createdDate: 'DESC',
      },
    });

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => navigateWithName('track', {item: item})}>
        {item && <MySellsOrderItem type="current" item={item} />}
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <InfiniteScroll
        bounces={false}
        contentContainerStyle={styles.contentContainer}
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
