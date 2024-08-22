import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {FlatList} from '~/components/elemental';
import {useGetAllUsers} from '../hooks';
import SearchHistoryItem from '../SearchHistoryItem';

const AccountsTab = ({
  searchInput,
  navigateWithName,
}: {
  searchInput?: string;
  navigateWithName: any;
}) => {
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetAllUsers({
    where: {and: [{user: {fullName: {contains: searchInput}}}]},
  });
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const renderItem = ({item, index}) => (
    <SearchHistoryItem
      {...{
        item: {value: JSON.stringify(item?.user), type: 'USER_ACCOUNT'},
        index,
        navigateWithName,
      }}
    />
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}
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
      />
    </View>
  );
};
export default AccountsTab;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 10},
  separator: {height: 16},
});
