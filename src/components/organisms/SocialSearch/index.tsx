import {VStack} from 'native-base';
import React from 'react';
import SearchBox from './SearchBox';
import {useNavigate} from '~/components';
import SearchPostList from './SearchPostList';
import {useGetExplorePosts} from './hooks';
import useAuthStore from '~/stores/authStore';
import useHeader from '~/components/elemental/hooks/use_header';
import TextPostList from '../SocialHome/PostList/SocialTextPostList';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import ReelsPreviewList from './ReelsPreviewList';

const Explore = () => {
  const {} = useHeader({hidden: true});
  const {navigateWithName} = useNavigate();
  const user = useAuthStore(state => state.user);

  const {socialType, handleCheckElementExist} = useSocialTypesConfig();
  const isTextual = socialType === 'text';

  const onSearchPress = () => {
    navigateWithName('SocialSearch');
  };

  const {
    data: postData,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetExplorePosts({
    where:
      handleCheckElementExist('post') && handleCheckElementExist('reels')
        ? {
            and: [
              {post: {isDraft: {eq: false}}},
              {post: {poster: {id: {neq: user?.id}}}},
            ],
          }
        : {
            and: [
              {post: {isDraft: {eq: false}}},
              {post: {poster: {id: {neq: user?.id}}}},
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
    <VStack flex="1" space={9} pt={3}>
      <SearchBox onPress={onSearchPress} />
      {isTextual ? (
        <TextPostList
          {...{
            isLoading,
            refetch,
            onEndReached: onLoadMore,
            navigateWithName,
            data: postData?.pages,
            isFetchingNextPage,
          }}
        />
      ) : handleCheckElementExist('post') ? (
        <SearchPostList
          postData={postData?.pages}
          {...{isLoading, refetch, onLoadMore, navigateWithName}}
        />
      ) : handleCheckElementExist('reels') ? (
        <ReelsPreviewList
          {...{
            isFetchingNextPage,
            isLoading,
            reelsData: postData?.pages,
            refetch,
            navigateWithName,
            onLoadMore,
            numOfCloumn: 2,
          }}
        />
      ) : (
        <></>
      )}
    </VStack>
  );
};
export default Explore;
