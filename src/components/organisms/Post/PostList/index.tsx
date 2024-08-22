import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import Header from '../../../atoms/Header';
import PostListItem from './PostListItem';
import {useGetBlockedUsers, useGetPosts} from '../hook';
import {useRoute} from '@react-navigation/native';
import useTrackedStates from '~/components/molecules/ItemSearch/useStates';
import {Layout, Typography, useDebounce} from '~/components/elemental';

const PostList = () => {
  const route: any = useRoute();

  const searchQuery = useTrackedStates(state => state?.searchQuery);
  const debouncedQuery = useDebounce(searchQuery, 500);

  const {data, isLoading, fetchNextPage, hasNextPage, refetch, isRefetching} =
    useGetPosts({
      where: route?.params?.item?.userId
        ? {
            posterId: {
              // nin: finalBlockedUsers,
              eq: route?.params?.item?.userId,
            },
            content: {
              contains: debouncedQuery,
            },
          }
        : {
            // posterId: {
            //   nin: finalBlockedUsers,
            // },
            content: {
              contains: debouncedQuery,
            },
          },
      order: {
        createdDate: 'DESC',
      },
    });

  const renderItem = ({item}) => {
    return (
      <>
        <PostListItem item={item} />
      </>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data?.pages}
      contentContainerStyle={{}}
      keyExtractor={(item, index) => item?.id}
      refreshing={isRefetching}
      onRefresh={refetch}
      onEndReachedThreshold={2}
      onEndReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      renderItem={renderItem}
      ListFooterComponent={<View style={{height: 100}} />}
    />
  );
};

export default PostList;

const styles = StyleSheet.create({});
