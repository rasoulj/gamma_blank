import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';

import {useRoute} from '@react-navigation/native';
import {
  AddIconSet,
  Header,
  Tabs,
  Typography,
  useDebounce,
  useNavigate,
} from '~/components/elemental';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';
import useAuthStore from '~/stores/authStore';
import {useGetProducts} from '../hook';
import ContentListItem from './ContentListItem';
import MyContentList from './MyContentList';
import PaidContentList from './PaidContentList';

const ContentList = ({
  isSeller = true,
  headerComponent,
  category,
}: {
  isSeller?: boolean;
  headerComponent?: any;
  category?: any;
}) => {
  const {navigateWithName} = useNavigate();

  const route: any = useRoute();
  const tabs = [
    {
      id: 'myContent',
      label: 'My Contents',
      component: <MyContentList navigateWithName={navigateWithName} />,
    },
    {
      id: 'paidContent',
      label: 'Paid Contents',
      component: <PaidContentList navigateWithName={navigateWithName} />,
    },
  ];

  const user = useAuthStore(state => state?.user);

  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const filters: any = useTrackedStates(state => state?.filters);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetProducts({
      where: category
        ? {
            product: {
              productType: {
                eq: 'content',
              },
              category: {
                eq: category ? category : '',
              },
            },
          }
        : {
            product: {
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
              productType: {
                eq: 'content',
              },
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
        product: {
          createdDate: 'DESC',
        },
      },
    });
  const renderItem = ({item}) => {
    return <ContentListItem item={item} navigateWithName={navigateWithName} />;
  };

  const emptyComponent = () => {
    return (
      <Typography color={'gray.300'} style={{alignSelf: 'center', margin: 20}}>
        {isLoading ? 'Loading...' : 'There is no more content'}
      </Typography>
    );
  };
  return (
    <>
      {!headerComponent && (
        <Header title="Library" style={{marginHorizontal: 0}}>
          {isSeller && user?.userRole === 'seller' && (
            <TouchableOpacity
              onPress={() => navigateWithName('create content')}>
              <AddIconSet />
            </TouchableOpacity>
          )}
        </Header>
      )}
      {isSeller && user?.userRole === 'seller' ? (
        <Tabs activeTab={'myContent'} tabs={tabs} style={{marginTop: 10}} />
      ) : (
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
          ListHeaderComponent={headerComponent}
          renderItem={renderItem}
          ListFooterComponent={<View style={{height: 200}} />}
          ListEmptyComponent={emptyComponent}
        />
      )}
    </>
  );
};

export default ContentList;

const styles = StyleSheet.create({});
