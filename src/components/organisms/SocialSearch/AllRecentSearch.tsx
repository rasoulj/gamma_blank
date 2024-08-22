import React, {useCallback} from 'react';
import {
  useDeleteAllSearchHistoryMutation,
  useGetSearchHistories,
} from './hooks';
import SearchHistoryItem from './SearchHistoryItem';
import {StyleSheet, View} from 'react-native';
import {FlatList, LoadIndicator, Typography} from '~/components/elemental';
import {useQueryClient} from 'react-query';
const AllRecentSearch = () => {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetSearchHistories({order: [{createdDate: 'DESC'}], take: 10});
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = ({item, index}) => (
    <SearchHistoryItem {...{item, index}} hasClose />
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const {mutate, isLoading: isDeleteLoading} =
    useDeleteAllSearchHistoryMutation();
  const queryClient = useQueryClient();
  const onClearAllPress = () => {
    mutate(
      {types: ['ALL', 'HASHTAG', 'USER_ACCOUNT']},
      {
        onSuccess: data => {
          if (data?.searchHistory_deleteSearchHistories?.code === 1) {
            queryClient.invalidateQueries(
              ['searchHistory_getSearchHistories'],
              {exact: false},
            );
          }
        },
      },
    );
  };

  const Header = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <Typography fontSize="md" fontWeight="500" color="gray.800">
          Recent search
        </Typography>
        {data?.pages?.length > 0 && (
          <Typography
            fontSize="xs"
            fontWeight="500"
            color="blue.700"
            onPress={onClearAllPress}>
            Clear all
          </Typography>
        )}
      </View>
    );
  }, [data]);

  return (
    <View style={styles.container}>
      {isDeleteLoading && <LoadIndicator />}
      <FlatList
        ListHeaderComponent={Header}
        data={data?.pages}
        onEndReached={onLoadMore}
        isLoading={isLoading}
        setEmptyComponent
        isFetchingNextPage={isFetchingNextPage}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={refetch}
        refreshing={false}
      />
    </View>
  );
};

export default AllRecentSearch;

const styles = StyleSheet.create({
  separator: {height: 16},
  container: {padding: 20, flex: 1},
  search: {marginBottom: 16},
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 16,
  },
});
