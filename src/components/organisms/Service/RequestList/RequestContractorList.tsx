import React, {useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Button, Typography, getColor} from '~/components/elemental';
import {useGetBookings, useGetServices} from '../hook';
import RequestListItem from './RequestListItem';
import useAuthStore from '~/stores/authStore';

const RequestContractorList = ({navigateWithName}) => {
  const [status, setStatus] = useState('Pending');

  const userId = useAuthStore(state => state?.user?.id);
  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetBookings({
      where: {
        status: {
          eq: status?.replace(' ', '_').toLocaleUpperCase(),
        },
        contractorId: {
          eq: userId,
        },
        serviceType:{
          eq: "IN_PERSON"
        }
      },
      order: {
        createdDate: 'DESC',
      },
    });
  const renderItem = ({item}) => {
    return (
      <RequestListItem
        item={item}
        status={status}
        type="contractor"
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
  const header = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
        }}>
        {['Pending', 'In progress', 'Completed'].map(item => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                height: 36,
                margin: 4,
                borderWidth: 1,
                borderColor: getColor({color: 'primary.500'}),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: getColor({
                  color: status === item ? 'primary.500' : 'background.500',
                }),
              }}
              onPress={() => setStatus(item)}>
              <Typography
                color={status === item ? 'background.500' : 'primary.500'}
                style={{fontSize: 14, fontWeight: '700'}}>
                {item}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
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
        ListHeaderComponent={header}
        ListFooterComponent={<View style={{height: 200}} />}
        ListEmptyComponent={emptyComponent}
      />
    </>
  );
};

export default RequestContractorList;

const styles = StyleSheet.create({});
