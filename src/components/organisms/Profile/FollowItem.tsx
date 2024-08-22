import React, {memo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  ConfirmationActionSheet,
  Typography,
  UserAvatar,
} from '~/components';
import {useRemoveFollowerMutation, useUnfollowMutation} from './hooks';
import {useQueryClient} from 'react-query';
import {scale} from '~/components/elemental';

const FollowItem = ({
  item,
  type,
  index,
  isCurrentUser,
  navigateWithName,
}: {
  item: any;
  index: number;
  isCurrentUser?: boolean;
  type: 'follower' | 'following';
  navigateWithName: any;
}) => {
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const onCloseConfirm = () => setVisibleConfirm(false);
  const onOpenConfirm = () => setVisibleConfirm(true);

  const queryClient = useQueryClient();
  const {mutate: unfollowMutate, isLoading: removeLoading} =
    useUnfollowMutation();
  const {mutate: removeFollower, isLoading: followingLoading} =
    useRemoveFollowerMutation();
  const onPressFollowing = () => {
    removeFollower(
      {followerId: item?.user?.id},
      {
        onSuccess: data => {
          if (data?.social_removeFollower?.status?.code === 1) {
            queryClient.invalidateQueries(['getFollowers'], {exact: false});
            queryClient.invalidateQueries(['social_getUserFollowInfo'], {
              exact: false,
            });
            setVisibleConfirm(false);
          }
        },
      },
    );
  };
  const onPressRemove = () => {
    unfollowMutate(
      {input: {followedId: item?.user?.id}},
      {
        onSuccess(data, variables, context) {
          if (data?.social_unfollow?.status?.code === 1) {
            queryClient.invalidateQueries(['social_getUserFollowInfo'], {
              exact: false,
            });
            queryClient.invalidateQueries(['getFollowers'], {exact: false});
            setVisibleConfirm(false);
          }
        },
      },
    );
  };

  return (
    <>
      <View style={styles.container}>
        <UserAvatar
          user={item?.user}
          hasShadow={false}
          avatarSize={scale(54)}
          extraData={item?.user?.username}
          mainNavigation={navigateWithName}
          pushStack
        />
        {isCurrentUser ? (
          type === 'following' ? (
            <Button
              variant="outline"
              borderWidth={2}
              onPress={
                item?.user?.iisPrivateAccount ? onOpenConfirm : onPressRemove
              }
              isLoading={followingLoading}>
              <Typography
                fontSize="sm"
                color="primary.500"
                fontWeight={'700'}
                py="0"
                px={4}>
                Following
              </Typography>
            </Button>
          ) : (
            <Button
              isLoading={removeLoading}
              variant="outline"
              borderWidth={2}
              onPress={onOpenConfirm}>
              <Typography
                fontSize="sm"
                color="primary.500"
                fontWeight={'700'}
                p="0"
                px={4}>
                Remove
              </Typography>
            </Button>
          )
        ) : (
          <></>
        )}
      </View>
      {visibleConfirm && (
        <ConfirmationActionSheet
          isOpen={visibleConfirm}
          onClose={onCloseConfirm}
          isLoading={removeLoading || followingLoading}
          onConfirmPress={
            type === 'following' ? onPressRemove : onPressFollowing
          }
          description={
            type === 'following'
              ? `If you change your mind, you’ll have to request to follow ${item?.user?.fullName} again.`
              : `We won’t tell ${item?.user?.fullName} they were remove from your followers.`
          }
          confirmButtonText={type === 'following' ? 'Unfollow' : 'Remove'}
          title={type === 'following' ? 'Confirmation' : 'Remove Follower?'}
        />
      )}
    </>
  );
};

export default memo(FollowItem);

const styles = StyleSheet.create({
  container: {flexDirection: 'row', justifyContent: 'space-between'},
});
