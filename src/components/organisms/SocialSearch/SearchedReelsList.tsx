import React from 'react';
import {useGetExplorePosts} from './hooks';
import {ReelsList, useRoute} from '~/components';
const SearchedReelsData = () => {
  const queryParams = useRoute()?.params?.queryParams;

  const {
    data: reelsData,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetExplorePosts({...queryParams});
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <ReelsList
      reelsData={reelsData?.pages}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      refetch={refetch}
    />
  );
};

export default SearchedReelsData;
