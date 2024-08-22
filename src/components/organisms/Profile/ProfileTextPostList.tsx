import React, {useCallback} from 'react';
import {Tabs} from 'react-native-collapsible-tab-view';
import {LoadIndicator} from '~/components/elemental';
import MasonryList from '@react-native-seoul/masonry-list';
import {useGetPosts} from './hooks';
import NoPosts from './NoPosts';
import TextPostList from '../SocialHome/PostList/SocialTextPostList';

const ProfileTextPostList = React.forwardRef(
  (
    {
      userId,
      listHeader,
    }: {
      userId: number;
      listHeader?: any;
    },
    ref,
  ) => {
    const {
      data: postData,
      isLoading,
      refetch,
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
    } = useGetPosts({
      where: {
        and: [
          {post: {posterId: {eq: userId}}},
          {post: {isDraft: {eq: false}}},
          {post: {postType: {eq: 'POST'}}},
        ],
      },
    });

    const onLoadMore = () => {
      if (hasNextPage) fetchNextPage();
    };

    return (
      <>
        {isLoading && <LoadIndicator />}
        <TextPostList
          data={postData?.pages ?? []}
          refetch={refetch}
          onEndReached={onLoadMore}
          isLoading={isLoading}
          ListEmptyComponent={
            isLoading ? undefined : <NoPosts userId={userId} />
          }
          isFetchingNextPage={isFetchingNextPage}
          listHeader={listHeader}
        />
      </>
    );
  },
);
export default ProfileTextPostList;
