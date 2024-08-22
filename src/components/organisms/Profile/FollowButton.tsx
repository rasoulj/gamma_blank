import {useMemo} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {
  HStack,
  TickIconSet,
  Typography,
  deviceWidth,
  useToast,
} from '~/components';
import {
  useFollowUserMutation,
  useUnfollowMutation,
  useUserUnBlockMutation,
} from './hooks';
import {useQueryClient} from 'react-query';
import {getColor} from '~/utils/helper/theme.methods';
import {scale} from '~/components/elemental';

const FollowButton = ({
  followInfo,
  userId,
  isBlocked = false,
}: {
  followInfo: {
    isFollowed: boolean;
    isFollower: boolean;
    requestSent: boolean;
    requestReceived: boolean;
    user: {isPrivateAccount: boolean};
  };
  userId: number;
  isBlocked?: boolean;
}) => {
  const queryClient = useQueryClient();
  const {toast} = useToast();

  const text = useMemo(() => {
    if (isBlocked) return 'Unblock';
    if (followInfo?.isFollowed) return 'Following';
    if (!followInfo?.isFollowed && followInfo?.requestSent) return 'Requested';
    if (followInfo?.isFollower && !followInfo?.requestSent)
      return 'Follow back';
    if (!followInfo?.isFollowed && !followInfo?.requestSent) return 'Follow';
    return 'Follow';
  }, [followInfo, isBlocked]);

  const queryInvalidation = async () => {
    await queryClient.invalidateQueries(['social_getUserFollowInfo'], {
      exact: false,
    });
    await queryClient.invalidateQueries(['getFollowers'], {
      exact: false,
    });
    await queryClient.invalidateQueries(['story_getLastStoriesOfUsers'], {
      exact: false,
    });
  };

  const {mutate: followMutate, isLoading: followLoading} =
    useFollowUserMutation();
  const onFollowUser = () => {
    followMutate(
      {input: {followedId: userId}},
      {
        onSuccess(data) {
          if (data?.social_followUser?.status?.code === 1) {
            queryInvalidation();
          } else {
            toast({message: data?.social_followUser?.status?.value});
          }
        },
        onError: () => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  const {mutate: unfollowMutate, isLoading: unfollowLoading} =
    useUnfollowMutation();
  const onUnfollowUser = () => {
    unfollowMutate(
      {input: {followedId: userId}},
      {
        onSuccess(data) {
          if (data?.social_unfollow?.status?.code === 1) {
            queryInvalidation();
          } else {
            toast({message: data?.social_unfollow?.status?.value});
          }
        },
        onError: () => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  const {mutate: unblockMutate, isLoading: unblocking} =
    useUserUnBlockMutation();
  const onUnblock = () => {
    unblockMutate(
      {input: {blockedUserId: userId}},
      {
        onSuccess(data) {
          if (data?.blockUser_unblock?.code === 1) {
            queryClient.invalidateQueries(['blockUser_getBlockedUsers'], {
              exact: false,
            });
            queryInvalidation();
          } else {
            toast({message: data?.blockUser_unblock?.value});
          }
        },
        onError: () => {
          toast({message: 'Something went wrong'});
        },
      },
    );
  };

  const onPress = () => {
    switch (text) {
      case 'Follow':
        onFollowUser();
        break;
      case 'Following':
        onUnfollowUser();
        break;
      case 'Requested':
        onUnfollowUser();
        break;
      case 'Follow back':
        onFollowUser();
        break;
      case 'Unblock':
        onUnblock();
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={
        text === 'Following' ? styles.outlineBtnContainer : styles.btnContainer
      }>
      {followLoading || unfollowLoading || unblocking ? (
        <ActivityIndicator size="small" />
      ) : (
        <HStack space="1" alignItems="center">
          {text === 'Following' && <TickIconSet color="primary.500" />}
          <Typography
            fontWeight="700"
            color={text === 'Following' ? 'primary.500' : 'gray.50'}
            fontSize="sm">
            {text}
          </Typography>
        </HStack>
      )}
    </TouchableOpacity>
  );
};

export default FollowButton;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: getColor({color: 'primary.500'}),
    borderRadius: 10,
    width: deviceWidth * 0.43,
    alignItems: 'center',
    height: scale(36),
    justifyContent: 'center',
  },

  outlineBtnContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: getColor({color: 'primary.500'}),
    width: deviceWidth * 0.43,
    alignItems: 'center',
    height: scale(36),
    justifyContent: 'center',
  },
});
