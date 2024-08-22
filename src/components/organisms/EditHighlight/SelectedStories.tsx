import {VStack} from 'native-base';
import React, {useCallback} from 'react';
import {FlatList, LoadIndicator} from '~/components';
import AddHighlghtItem from '~/components/organisms/AddHighlight/AddHighlightItem';
import useAuthStore from '~/stores/authStore';
import {useGetStories} from '../AddHighlight/hook';
const SelectedStories = ({highlightId, isSelected = false, selectedItems}) => {
  const user = useAuthStore(state => state.user);
  const {
    data: stories,
    isLoading,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetStories({
    where: isSelected
      ? {
          and: [
            {
              story: {
                highlightStories: {some: {highlightId: {eq: highlightId}}},
              },
            },
            {story: {isDraft: {eq: false}}},
          ],
        }
      : {
          and: [
            {story: {userId: {eq: user?.id}}},
            {story: {isDraft: {eq: false}}},
            {
              story: {
                highlightStories: {none: {highlightId: {eq: highlightId}}},
              },
            },
          ],
        },
    order: [{story: {createdDate: 'DESC'}}],
  });

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <AddHighlghtItem {...{item, index, selectedItems, isSelected}} />
    ),
    [selectedItems],
  );

  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <VStack flex="1">
      {isLoading && <LoadIndicator />}
      <FlatList
        onEndReached={onLoadMore}
        data={stories?.pages}
        renderItem={renderItem}
        numColumns={3}
        refreshing={false}
        onRefresh={refetch}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        contentContainerStyle={{marginTop: 10}}
      />
    </VStack>
  );
};
export default SelectedStories;
