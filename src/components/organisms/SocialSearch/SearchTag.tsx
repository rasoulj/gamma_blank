import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Typography,
  getColor,
  useNavigate,
  useRoute,
} from '~/components/elemental';
import {deviceWidth, scale} from '~/utils/methods';
import {
  useFollowTagMutation,
  useGetPosts,
  useIsFollowedPostQuery,
  useUnfollowTagMutation,
} from './hooks';
import SearchPostList from './SearchPostList';
import {useQueryClient} from 'react-query';
import TextPostList from '../SocialHome/PostList/SocialTextPostList';
import useSocialTypesConfig from '~/utils/useSocialTypesConfig';
import useHeader from '~/components/elemental/hooks/use_header';

const SearchTag = () => {
  const tag = useRoute().params?.tag;
  const {navigateWithName} = useNavigate();
  const {socialType} = useSocialTypesConfig();

  const {} = useHeader({title: {children: tag}});

  const {
    data,
    isLoading,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetPosts({
    where: {
      and: [{post: {isDraft: {eq: false}}}, {post: {content: {contains: tag}}}],
    },
  });
  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const {data: isFollowedData} = useIsFollowedPostQuery({tag});
  const isFollowed = isFollowedData?.post_tagIsFollowed?.code === 1;

  const {mutate: followMutate, isLoading: followLoading} =
    useFollowTagMutation();
  const {mutate: unfollowMutate, isLoading: unfollowLoading} =
    useUnfollowTagMutation();
  const queryClient = useQueryClient();
  const onFollowPress = () => {
    if (isFollowed) {
      unfollowMutate(
        {tag},
        {
          onSuccess: data => {
            queryClient.invalidateQueries(['post_tagIsFollowed'], {
              exact: false,
            });
          },
        },
      );
    } else {
      followMutate(
        {tag},
        {
          onSuccess: data => {
            queryClient.invalidateQueries(['post_tagIsFollowed'], {
              exact: false,
            });
          },
        },
      );
    }
  };

  return (
    <View style={styles.flex1}>
      <View style={styles.headerContainer}>
        <View style={styles.roundedView}>
          <Typography fontSize="3xl" color="gray.800">
            #
          </Typography>
        </View>
        <View style={styles.counter}>
          <Typography
            marginBottom={'2'}
            fontWeight="600"
            fontSize="lg"
            color="gray.800">
            {`${data?.totalCount}`}
            <Typography
              fontWeight="400"
              fontSize="md"
              color="gray.500">{` post ${
              data?.totalCount > 1 ? 's' : ''
            }`}</Typography>
          </Typography>
          <TouchableOpacity style={styles.btn} onPress={onFollowPress}>
            {followLoading || unfollowLoading ? (
              <ActivityIndicator color={getColor({color: 'gray.50'})} />
            ) : (
              <Typography color="gray.50" fontWeight="700" fontSize="sm">
                {isFollowed ? 'Unfollow' : 'Follow'}
              </Typography>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {socialType === 'text' ? (
        <TextPostList
          {...{
            onEndReached: onLoadMore,
            data: data?.pages,
            isLoading,
            refetch,
            navigateWithName,
            isFetchingNextPage,
          }}
        />
      ) : (
        <SearchPostList
          {...{
            onLoadMore,
            postData: data?.pages,
            isLoading,
            refetch,
            navigateWithName,
          }}
        />
      )}
    </View>
  );
};
export default SearchTag;

const width = scale(80);
const styles = StyleSheet.create({
  roundedView: {
    width: width,
    height: width,
    borderRadius: width / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: getColor({color: 'gray.200'}),
  },

  counter: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  flex1: {flex: 1},

  btn: {
    width: deviceWidth * 0.5,
    height: scale(36),
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
