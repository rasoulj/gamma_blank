import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  AddIconSet,
  Header,
  Typography,
  useDebounce,
  useNavigate,
} from '~/components/elemental';
import useAuthStore from '~/stores/authStore';
import {useGetServices} from '../hook';
import ServiceListItem from './ServiceListItem';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';
const ServiceList = ({
  headerComponent,
  type = 'IN_PERSON',
}: {
  headerComponent?: any;
  type?: 'IN_PERSON' | 'ONLINE';
}) => {
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state?.user);
  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const filters: any = useTrackedStates(state => state?.filters);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetServices({
      where: {
        service: {
          serviceType: {
            eq: type,
          },
          ...(filters?.category && {
            category: {
              eq: filters?.category,
            },
          }),
          ...(filters?.rate && {
            rateAverage: {
              eq: filters?.rate,
            },
          }),
          ...(filters?.keyword && {
            description: {
              contains: filters?.keyword,
            },
          }),
          ...(filters?.date && {
            createdDate: {
              lte: filters?.date,
            },
          }),
          ...(filters?.duration && {
            contentDuration: {
              eq: filters?.duration,
            },
          }),
          ...(filters?.person?.id && {
            userId: {
              eq: filters?.person?.id,
            },
          }),
          title: {
            startsWith: debouncedQuery,
          },
          price: {
            gte: filters?.rangePrice?.[0],
            lte: filters?.rangePrice?.[1],
          },
        },
      },
      order: {
        service: {
          createdDate: 'DESC',
        },
      },
    });
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => navigateWithName('service detail', {item})}>
        <ServiceListItem item={item} />
      </TouchableOpacity>
    );
  };

  const emptyComponent = () => {
    return (
      <Typography color={'gray.300'} style={{alignSelf: 'center', margin: 20}}>
        {isLoading ? 'Loading...' : 'There is no more service'}
      </Typography>
    );
  };
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data?.pages}
        numColumns={2}
        contentContainerStyle={{flexGrow: 1}}
        refreshing={isRefetching}
        onRefresh={refetch}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        ListHeaderComponent={headerComponent}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 200}} />}
        ListEmptyComponent={emptyComponent}
      />
    </>
  );
};

export default ServiceList;

const styles = StyleSheet.create({});
