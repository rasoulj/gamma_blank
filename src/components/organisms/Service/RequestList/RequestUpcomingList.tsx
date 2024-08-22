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

const RequestUpcomingList = ({navigateWithName}) => {
  const userId = useAuthStore(state => state?.user?.id);

  const date = new Date();


  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetBookings({
      where: {
        contractorId: {
          eq: userId,
        },
        startTime: {
          gte: `${date?.getFullYear()}-${
            date?.getMonth() + 1
          }-${date?.getDate()}`,
        },
        service: {
          serviceType: {
            eq: 'ONLINE',
          },
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
        type="upcoming"
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

export default RequestUpcomingList;

const styles = StyleSheet.create({});
