import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomActionSheet from '~/components/atoms/CustomActionSheet';
import {
  BlockIcon,
  ConfirmationActionSheet,
  EyeIconSet,
  LoadIndicator,
  ReportIcon,
  Typography,
  getColor,
} from '~/components/elemental';
import ReportListModal from '~/components/molecules/ReportModal';
import {Share3Icon} from '~/assets';
import {
  useIsMuteUserQuery,
  useMutePostMutation,
  useMuteStoryMutation,
  useRemoveFollowerFolloweeMutation,
  useUnMutePostMutation,
  useUnMuteStoryMutation,
  useUserBlockMutation,
  useUserUnBlockMutation,
} from './hooks';
import {useQueryClient} from 'react-query';
import SuccessBlockModal from './SuccessBlockModal';
import ShareModal from '~/components/molecules/ShareModal';

const reportList = [
  {id: 1, text: 'They are pretending to be someone else'},
  {id: 2, text: 'They may be under the age 13'},
  {id: 3, text: 'Something else', isOther: true},
];

const OtherUserMenu = ({
  item,
  isBlocked = false,
  isVisible,
  onClose,
}: {
  item: any;
  isBlocked?: boolean;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [isBlockUserModalVisible, setIsBlockUserModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [visibleSuccessBlock, setVisibleSuccessBlock] = useState(false);
  const [visibleShare, setVisibleShare] = useState(false);

  const onSharePress = () => setVisibleShare(true);
  const onCloseShare = () => setVisibleShare(false);

  const onHandleClose = () => {
    setIsBlockUserModalVisible(false);
    setVisibleSuccessBlock(false);
    setIsReportModalVisible(false);
    onCloseShare();
    onClose();
  };

  const queryClient = useQueryClient();
  const blockText = useRef(false);
  const onBlockPress = () => setIsBlockUserModalVisible(true);
  const onReportPress = () => setIsReportModalVisible(true);
  const {data: muteData} = useIsMuteUserQuery({userId: item?.id});
  const isMuted =
    muteData?.post_getMutePost?.result?.totalCount > 0 ||
    muteData?.story_getMuteStory?.result?.totalCount > 0;

  const {mutate, isLoading} = useMutePostMutation();
  const {mutate: storyMutate, isLoading: storyIsLoading} =
    useMuteStoryMutation();
  const onMutePostAndStory = () => {
    storyMutate(
      {targetUserId: item?.id},
      {
        onSuccess: data => {
          if (data?.story_muteStory?.code === 1) {
            onMutePostPress();
          }
        },
        onError: errorData => {},
      },
    );
  };

  const onMutePostPress = () => {
    mutate(
      {targetUserId: item?.id},
      {
        onSuccess: data => {
          if (data?.post_mutePost?.code === 1) {
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['isMuted'], {exact: false});
            onClose();
          } else {
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['isMuted'], {exact: false});
            onClose();
          }
        },
        onError: errorData => {},
      },
    );
  };

  const {mutate: unMutePost, isLoading: unmutePostLoading} =
    useUnMutePostMutation();
  const {mutate: unMuteStory, isLoading: unmuteStoryLoading} =
    useUnMuteStoryMutation();
  const onUnMutePostAndStory = () => {
    unMuteStory(
      {targetUserId: item?.id},
      {
        onSuccess: data => {
          if (data?.story_unmuteStory?.code === 1) {
            onUnMutePostPress();
          }
        },
        onError: errorData => {},
      },
    );
  };
  const onUnMutePostPress = () => {
    unMutePost(
      {targetUserId: item?.id},
      {
        onSuccess: data => {
          if (data?.post_unmutePost?.code === 1) {
            queryClient.invalidateQueries(['getPosts'], {exact: false});
            queryClient.invalidateQueries(['post_getUserAndFollowingPosts'], {
              exact: false,
            });
            queryClient.invalidateQueries(['isMuted'], {exact: false});
            onClose();
          } else {
            onClose();
          }
        },
        onError: errorData => {
          onClose();
        },
      },
    );
  };

  const {mutate: blockMutate, isLoading: blocking} = useUserBlockMutation();
  const {mutate: removeFollowMutate, isLoading: removeLoading} =
    useRemoveFollowerFolloweeMutation();
  const {mutate: unblockMutate, isLoading: unblocking} =
    useUserUnBlockMutation();
  const onConfirmBlock = () => {
    if (isBlocked)
      unblockMutate(
        {input: {blockedUserId: item?.id}},
        {
          onSuccess(data, variables, context) {
            if (data?.blockUser_unblock?.code === 1) {
              queryClient.invalidateQueries(['blockUser_getBlockedUsers'], {
                exact: false,
              });
              queryClient.invalidateQueries(['social_getUserFollowInfo'], {
                exact: false,
              });
              blockText.current = false;
              setVisibleSuccessBlock(true);
            }
          },
        },
      );
    else
      blockMutate(
        {input: {blockedUserId: item?.id}},
        {
          onSuccess(data, variables, context) {
            if (data?.blockUser_block?.status?.code === 1) {
              queryClient.invalidateQueries(['blockUser_getBlockedUsers'], {
                exact: false,
              });
            }
            removeFollowMutate(
              {targetUserId: item?.id},
              {
                onSuccess: data => {
                  if (data?.social_removeFollowerAndFollowee?.code == 1) {
                    blockText.current = true;
                    setVisibleSuccessBlock(true);
                  }
                },
              },
            );
          },
        },
      );
  };

  if (visibleShare) {
    const shareObject = {id: item?.id, mediaUrl: item?.photoUrl};
    return (
      <ShareModal
        isVisible={visibleShare}
        onClose={onHandleClose}
        mediaType="CONTACT"
        item={shareObject}
        deepLink={`profile?userId=${item?.id}`}
      />
    );
  }
  if (visibleSuccessBlock)
    return (
      <SuccessBlockModal
        isBlocked={blockText.current}
        isVisible={visibleSuccessBlock}
        onClose={onHandleClose}
      />
    );
  if (isBlockUserModalVisible)
    return (
      <ConfirmationActionSheet
        isOpen={isBlockUserModalVisible}
        onClose={onHandleClose}
        onConfirmPress={onConfirmBlock}
        description={`Are you sure you want to ${
          isBlocked ? 'Unblock' : 'block'
        } this user?`}
        confirmButtonText={`${isBlocked ? 'Unblock' : 'block'}`}
        isLoading={blocking || unblocking || removeLoading}
      />
    );
  if (isReportModalVisible)
    return (
      <ReportListModal
        item={item}
        isVisible={isReportModalVisible}
        onClose={onHandleClose}
        reportList={reportList}
      />
    );
  return (
    <CustomActionSheet isVisible={isVisible} onClose={onHandleClose}>
      {(unmutePostLoading ||
        unmuteStoryLoading ||
        storyIsLoading ||
        isLoading) && <LoadIndicator />}
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onSharePress}>
          <Share3Icon color={'gray.800'} />
          <Typography color={'gray.800'} style={styles.textStyle}>
            Share
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={isMuted ? onUnMutePostAndStory : onMutePostAndStory}>
          <EyeIconSet color={getColor({color: 'gray.800'})} />
          <Typography color={'gray.800'} style={styles.textStyle}>
            {`${isMuted ? 'Unmute' : 'Mute'} user`}
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={onReportPress}>
          <ReportIcon color={getColor({color: 'error.600'})} />
          <Typography color={'error.600'} style={styles.textStyle}>
            Report
          </Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.touchable} onPress={onBlockPress}>
          <BlockIcon color={'error.600'} />
          <Typography color={'error.600'} style={styles.textStyle}>
            {`${isBlocked ? 'Unblock' : 'Block'} user`}
          </Typography>
        </TouchableOpacity>
      </View>
    </CustomActionSheet>
  );
};

export default OtherUserMenu;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
  },

  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },

  textStyle: {marginLeft: 8, fontWeight: 'bold'},
});
