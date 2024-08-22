import React from 'react';
import SearchPostList from '../SearchPostList';
import {StyleSheet, View} from 'react-native';
import {useGetPosts} from '../hooks';
import TextPostList from '../../SocialHome/PostList/SocialTextPostList';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import ReelsPreviewList from '../ReelsPreviewList';
import {model} from '~/data/model';

const socialsearch = model?.metaData?.configs?.socialsearch ?? {
  accounts: true,
  reels: true,
  isShowExplore: true,
  tags: true,
};

const ForYou = ({
  searchInput,
  navigateWithName,
}: {
  searchInput?: string;
  navigateWithName: any;
}) => {
  const {socialType, handleCheckElementExist} = useSocialTypesConfig();

  const {
    data: postData,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPosts({
    where:
      handleCheckElementExist('post') && handleCheckElementExist('reels')
        ? socialsearch?.reels
          ? {
              and: [
                {post: {isDraft: {eq: false}}},
                {post: {content: {contains: searchInput}}},
              ],
            }
          : {
              and: [
                {post: {isDraft: {eq: false}}},
                {post: {content: {contains: searchInput}}},
                {
                  post: {
                    postType: {
                      eq: 'POST',
                    },
                  },
                },
              ],
            }
        : {
            and: [
              {post: {isDraft: {eq: false}}},
              {post: {content: {contains: searchInput}}},
              {
                post: {
                  postType: {
                    eq: handleCheckElementExist('post') ? 'POST' : 'REELS',
                  },
                },
              },
            ],
          },
  });
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <View style={styles.container}>
      {socialType === 'text' ? (
        <TextPostList
          {...{
            data: postData?.pages,
            isFetchingNextPage,
            isLoading,
            refetch,
            onEndReached: onLoadMore,
            navigateWithName,
          }}
        />
      ) : handleCheckElementExist('post') ? (
        <SearchPostList
          {...{
            onLoadMore,
            postData: postData?.pages,
            isLoading,
            refetch,
            navigateWithName,
          }}
        />
      ) : (
        <ReelsPreviewList
          {...{
            onLoadMore,
            reelsData: postData?.pages,
            isLoading,
            refetch,
            navigateWithName,
          }}
        />
      )}
    </View>
  );
};

export default ForYou;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 10},
});
