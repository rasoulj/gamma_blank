import React, {useRef, useState} from 'react';
import {
  HeartIconSet,
  SendIcon3,
  Typography,
  getColor,
  HStack,
  VStack,
} from '~/components/elemental';
import {scale} from '~/utils/methods';
import MessageInput from '../Chat/Chat/MessageInput';
import {TextInput} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import ShareModal from '~/components/molecules/ShareModal';
import {useStoryLikeStoryMutation, useStoryRemoveLikeMutation} from './hooks';
import {model} from '~/data/model';
import {StyleSheet} from 'react-native';
import {CustomActionSheet, useToast} from '~/components';

const configs = model.metaData.configs?.socialStory ?? {
  share: true,
  like: true,
  reply: true,
};

const StoryItemBottomOptions = ({
  onPauseTimeLine,
  likeCount,
  item,
  onPressOut,
}: {
  onPauseTimeLine: any;
  likeCount: number;
  item: number;
  onPressOut: any;
}) => {
  const [visibleReply, setVisibleReply] = useState(false);
  const [visibleShareModal, setVisibleShareModal] = useState(false);

  const onCloseShareModal = () => {
    onPressOut();
    setVisibleShareModal(false);
  };
  const onSendPress = () => {
    onPauseTimeLine();
    setVisibleShareModal(true);
  };

  const {mutate: likeMutate} = useStoryLikeStoryMutation();
  const {mutate: unLikeMutate} = useStoryRemoveLikeMutation();
  const onLikeStoryPress = () => {
    if (item?.isLikedByCurrentUser) unLikeMutate({storyId: item?.story?.id});
    else likeMutate({storyId: item?.story?.id});
  };

  const inputRef = useRef<TextInput>();
  const onReplyPress = () => {
    onPauseTimeLine();
    setVisibleReply(true);
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 100);
  };
  const onCloseReply = () => {
    setVisibleReply(false);
    onPressOut();
  };

  const {toast} = useToast();
  const onMessageSent = () => {
    onCloseReply();
    toast({message: 'Your reply has been sent successfully', type: 'success'});
  };

  return (
    <>
      <HStack position="absolute" left={0} right={0} zIndex={1000} bottom={0}>
        <HStack
          w="100%"
          px={scale(20)}
          space="4"
          bottom={scale(20)}
          justifyContent="flex-end">
          {configs?.reply && (
            <TouchableOpacity onPress={onReplyPress} style={styles.flex1}>
              <VStack
                alignItems="center"
                justifyContent="center"
                flex="1"
                py="2"
                borderRadius="10"
                bgColor="rgba(255, 255, 255, 0.3)">
                <Typography fontWeight="700" fontSize="sm" color="gray.800">
                  Reply ...
                </Typography>
              </VStack>
            </TouchableOpacity>
          )}
          {(configs?.like || configs?.share) && (
            <HStack
              alignItems="center"
              borderRadius="10"
              px="2"
              py="2"
              bgColor="rgba(255, 255, 255, 0.3)">
              {configs?.like && (
                <>
                  <HeartIconSet
                    color={
                      item?.isLikedByCurrentUser
                        ? getColor({color: 'error.500'})
                        : getColor({color: 'gray.800'})
                    }
                    width={24}
                    fill={
                      item?.isLikedByCurrentUser
                        ? getColor({color: 'error.500'})
                        : 'transparent'
                    }
                    height={24}
                    onPress={onLikeStoryPress}
                  />
                  <Typography
                    mr="4"
                    ml="1"
                    color="gray.800"
                    fontWeight="400"
                    fontSize="sm">
                    {item?.story?.likesCount}
                  </Typography>
                </>
              )}
              {configs?.share && (
                <SendIcon3
                  color={getColor({color: 'gray.800'})}
                  width={24}
                  height={24}
                  onPress={onSendPress}
                />
              )}
            </HStack>
          )}
        </HStack>
      </HStack>
      {visibleReply && (
        <ReplyActionSheet
          {...{item, onCloseReply, onMessageSent, visibleReply}}
        />
      )}
      {visibleShareModal && (
        <ShareModal
          item={item}
          mediaType="SHARED_STORY"
          isVisible={visibleShareModal}
          onClose={onCloseShareModal}
          deepLink={`storyDetails?id=${item?.story?.id}&userId=${item?.story?.user?.id}`}
        />
      )}
    </>
  );
};
export default StoryItemBottomOptions;

const ReplyActionSheet = ({
  item,
  onMessageSent,
  visibleReply,
  onCloseReply,
}: {
  visibleReply: boolean;
  item: any;
  onMessageSent: any;
  onCloseReply: VoidFunction;
}) => {
  return (
    <CustomActionSheet isVisible={visibleReply} onClose={onCloseReply}>
      <VStack backgroundColor="background.500">
        <MessageInput
          item={{id: item?.story?.user?.id, item}}
          replyTo={undefined}
          setReplyTo={undefined}
          allowUploadImage={false}
          onMessageSent={onMessageSent}
          mediaType="REPLY_STORY"
          mediaEntityId={item?.story?.id}
          mediaUrl={
            item?.story?.mediaType === 'VIDEO'
              ? item?.story?.thumbnail
              : item?.story?.mediaUrl
          }
          autoFocus={visibleReply}
        />
      </VStack>
    </CustomActionSheet>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
