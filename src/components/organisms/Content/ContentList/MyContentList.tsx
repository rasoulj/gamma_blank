import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import useAuthStore from '~/stores/authStore';
import {useGetProducts} from '../hook';
import {Typography} from '~/components/elemental';
import ContentListItem from './ContentListItem';

const MyContentList = ({navigateWithName}) => {
  const {user} = useAuthStore();

  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetProducts({
      where: {
        product: {
          userId: {
            eq: user?.id,
          },
          productType: {
            eq: 'content',
          },
        },
      },
      order: {
        product: {
          createdDate: 'DESC',
        },
      },
    });

  const renderItem = ({item}) => {
    return (
      <>
        <ContentListItem item={item} navigateWithName={navigateWithName} />
      </>
    );
  };
  const emptyComponent = () => {
    return (
      <Typography color={'gray.300'} style={{alignSelf: 'center', margin: 20}}>
        {isLoading ? 'Loading...' : 'There is no more content'}
      </Typography>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data?.pages}
      contentContainerStyle={{flexGrow: 1}}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReachedThreshold={0.9}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      renderItem={renderItem}
      ListFooterComponent={<View style={{height: 200}} />}
      ListEmptyComponent={emptyComponent}
    />
  );
};

export default MyContentList;

const styles = StyleSheet.create({});
