import React, {useCallback} from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import {ActivityIndicator, StyleSheet} from 'react-native';
import AutoHightPostItem from './AutoHightPostItem';
import EmptyResult from './EmptyResult';

const SearchPostList = ({
  postData,
  onLoadMore,
  isLoading,
  refetch,
  navigateWithName,
}: {
  postData?: any;
  onLoadMore?: any;
  isLoading?: boolean;
  refetch?: any;
  navigateWithName: any;
}) => {
  const renderItem = useCallback(({item, i: index}) => {
    return (
      <AutoHightPostItem
        {...{item: item?.post ?? item, index, navigateWithName}}
      />
    );
  }, []);

  return (
    <>
      {isLoading && <ActivityIndicator />}
      <MasonryList
        style={styles.flex1}
        nestedScrollEnabled
        data={postData ?? []}
        keyExtractor={(item): string => `${item?.post?.id ?? item?.id}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshing={false}
        onRefresh={refetch}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        loading={isLoading}
        ListEmptyComponent={isLoading ? undefined : <EmptyResult />}
      />
    </>
  );
};
export default SearchPostList;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
