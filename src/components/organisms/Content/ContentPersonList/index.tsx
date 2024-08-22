import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  FlatList,
  PersonList,
  Typography,
  useNavigate,
} from '~/components/elemental';
import {useGetCreators, useGetProducts} from '../hook';
import PersonListItem from './PersonListItem';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';

const ContentPersonList = () => {
  const {navigateWithName} = useNavigate();
  const filters = useTrackedStates(state => state?.filters);
  const setFilters = useTrackedStates(state => state?.setFilters);

  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetCreators();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => [
          setFilters({...filters, person: item}),
          navigateWithName('item search'),
        ]}>
        <PersonListItem item={item} />
      </TouchableOpacity>
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
    <View>
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
        // ListHeaderComponent={headerComponent}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 200}} />}
        ListEmptyComponent={emptyComponent}
      />
    </View>
  );
};

export default ContentPersonList;

const styles = StyleSheet.create({});
