import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {
  Button,
  Typography,
  getColor,
  useNavigate,
} from '~/components/elemental';
import {useGetBookings, useGetServices} from '../hook';
import RequestListItem from './RequestListItem';
import {TouchableOpacity} from 'react-native';
import useAuthStore from '~/stores/authStore';

const RequestPastList = ({navigateWithName}) => {
  const userId = useAuthStore(state => state?.user?.id);
  const token = useAuthStore(state => state?.token);
  const date = new Date();

  console.log(token);

  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetBookings({
      where: {
        service: {
          serviceType: {
            eq: 'ONLINE',
          },
        },
        createdDate: {
          lt: `${date?.getFullYear()}-${
            date?.getMonth() + 1
          }-${date?.getDate()}`,
        },
        contractorId: {
          eq: userId,
        },
      },
      order: {
        createdDate: 'DESC',
      },
    });
  const renderItem = ({item}) => {
    return (
      <RequestListItem
        item={item}
        type="past"
        navigateWithName={navigateWithName}
      />
    );
  };

  const emptyComponent = () => {
    return (
      <Typography color={'gray.300'} style={{alignSelf: 'center', margin: 20}}>
        {isLoading ? 'Loading...' : 'There is no more Service'}
      </Typography>
    );
  };

  return (
    <>
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
    </>
  );
};

export default RequestPastList;

const styles = StyleSheet.create({});
