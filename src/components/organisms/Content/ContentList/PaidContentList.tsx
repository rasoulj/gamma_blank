import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../atoms/Header';

import {useRoute} from '@react-navigation/native';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';
import {Typography, useDebounce} from '~/components/elemental';
import {useGetPaidProducts, useGetProducts} from '../hook';
import ContentListItem from './ContentListItem';
import useAuthStore from '~/stores/authStore';

const PaidContentList = ({navigateWithName}) => {
  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetPaidProducts({
      where: {
        product: {
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
        {item && (
          <ContentListItem item={item} navigateWithName={navigateWithName} />
        )}
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

export default PaidContentList;

const styles = StyleSheet.create({});
