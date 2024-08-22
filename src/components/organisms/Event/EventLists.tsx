import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import Screen from '../../atoms/Screen';
import {useGetEvents} from './hooks';
import EventListItem from './EventListItem';
import {
  FlatList,
  graphqlFetcher,
  useNavigate,
  useDebounce,
  RelativeLayout,
  Typography,
  LoadIndicator,
  VStack,
  deviceHeight,
  Layer,
} from '~/components/elemental';

import useTrackedStates from '../../molecules/ItemSearch/useStates';
import {useMutation, useQueryClient} from 'react-query';

function generateWhere(input, query?) {
  const where = {and: [{or: []}]};

  if (query) {
    where.and[0].or.push({
      event: {title: {contains: query}},
    });
  }
  if (input.categoryId && input.categoryId !== 0) {
    where.and[0].or.push({
      event: {category: {eq: input.category}},
    });
  }
  if (input.city) {
    where.and[0].or.push({
      event: {city: {eq: input.city}},
    });
  }
  if (input.state) {
    where.and[0].or.push({
      event: {state: {eq: input.state}},
    });
  }
  if (input.price) {
    where.and[0].or.push({
      event: {price: {gt: input.price[0], lt: input.price[1]}},
    });
  }
  if (input.zipCode) {
    where.and[0].or.push({
      event: {zipCode: {eq: input.zipCode}},
    });
  }

  return where;
}

const EventLists = ({
  onPress,
  hasManagement = false,
}: {
  onPress?: any;
  hasManagement?: boolean;
}) => {
  const {filters, searchQuery}: any = useTrackedStates();
  const where = filters?.toUseInFilters || {};
  const debouncedQuery = useDebounce(searchQuery, 500);
  const {navigateWithName} = useNavigate();
  const queryClient = useQueryClient();
  const {mutate: dislike} = useMutation(
    args => {
      return graphqlFetcher(
        'mutation ($eventId: Int!) {  eventAndTicketing_removeFavoriteEvent (eventId: $eventId) {    code, value  }}',
        args,
      );
    },
    {
      onSuccess: (data: any) => {
        if (data?.eventAndTicketing_removeFavoriteEvent?.value === 'Success') {
          refetch();
        }
      },
    },
  );

  const {mutate: like} = useMutation(
    args => {
      return graphqlFetcher(
        'mutation ($eventId: Int!) {  eventAndTicketing_createFavoriteEvent (eventId: $eventId) {    status  }}',
        args,
      );
    },
    {
      onSuccess: (data: any) => {
        if (
          data?.eventAndTicketing_createFavoriteEvent?.status?.value ===
          'Success'
        ) {
          refetch();
        }
      },
    },
  );

  const {
    data,
    isLoading,
    fetchNextPage,
    error,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetEvents({
    order: {
      event: {createdDate: 'DESC'},
    },
    where: generateWhere(where, debouncedQuery),
  });

  const events = data?.pages || [];

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <EventListItem
        {...{onPress, item}}
        mb="8"
        hasManagement={hasManagement}
        index={index}
        like={like}
        dislike={dislike}
        navigation={navigateWithName}
      />
    );
  };

  return (
    <FlatList
      data={events}
      keyExtractor={(_, index) => `key${index}`}
      renderItem={renderItem}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListEmptyComponent={() => (
        <RelativeLayout
          style={{
            flex: 1,
            height: deviceHeight * 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography>
            {isLoading ? (
              <VStack space={2}>
                <ActivityIndicator />
                <Typography>Please wait</Typography>
              </VStack>
            ) : events.length === 0 ? (
              'No data found!'
            ) : (
              ''
            )}
          </Typography>
        </RelativeLayout>
      )}
      contentContainerStyle={[styles.contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={<Layer style={{height: 120}} />}
      onEndReachedThreshold={0.9}
      onEndReached={() => {
        onLoadMore?.();
      }}
    />
  );
};

export default EventLists;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  contentContainerStyle: {
    paddingTop: 10,
  },
});
