import {View} from 'react-native';
import React, {useCallback} from 'react';
import {Box, FlatList} from '~/components';
import SocialTextPostItem from './SocialTextPostItem';
import EmptyResult from '../../SocialSearch/EmptyResult';

const TextPostList = ({
  listHeader,
  data,
  navigateWithName,
  isFetchingNextPage,
  refetch,
  onEndReached,
  isLoading,
  ...rest
}: {
  listHeader?: any;
  data?: any;
  navigateWithName?: any;
  isFetchingNextPage?: boolean;
  refetch?: any;
  onEndReached?: any;
  isLoading?: boolean;
}) => {
  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <SocialTextPostItem
          dtoItem={item}
          usersLiked={item?.usersLiked}
          navigateWithName={navigateWithName}
        />
      );
    },
    [],
  );
  const keyExtractor = useCallback((item: any, index: number) => {
    return `post${item?.id}_${index}`;
  }, []);
  const itemSeparator = useCallback(() => <Box h="6" />, []);

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        refreshing={false}
        isFetchingNextPage={isFetchingNextPage}
        onRefresh={refetch}
        onEndReachedThreshold={2}
        onEndReached={onEndReached}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={<View style={{height: 100}} />}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={<EmptyResult />}
        isLoading={isLoading}
        {...rest}
      />
    </>
  );
};

export default TextPostList;
