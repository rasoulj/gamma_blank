import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlatList} from '~/components/elemental';
import {useGetAllPostsTags} from '../hooks';
import SearchHistoryItem from '../SearchHistoryItem';

const TagsTab = ({
  searchInput,
  navigateWithName,
  ListHeaderComponent,
}: {
  searchInput?: string;
  navigateWithName: any;
  ListHeaderComponent?: any;
}) => {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetAllPostsTags({
    where: {data: {contains: searchInput}},
  });
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = ({item, index}) => (
    <SearchHistoryItem
      {...{item: {value: item?.data, type: 'HASHTAG'}, index, navigateWithName}}
    />
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages}
        onEndReached={onLoadMore}
        isLoading={isLoading}
        setEmptyComponent
        isFetchingNextPage={isFetchingNextPage}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        onRefresh={refetch}
        refreshing={false}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};
export default TagsTab;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 10},
  separator: {height: 16},
});
