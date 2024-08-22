import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {useQueryClient} from 'react-query';
import useAuthStore from '~/stores/authStore';
import {ConfirmationActionSheet, ReplyIcon, TrashIconSet} from '~/components';
import {
  useGetDirectChat,
  useRemoveUserMessage,
} from '../../../elemental/hooks/use_get_chat';
import ChatBar from './ChatBar';
import ChatImageItem from './ChatImageItem';
import ChatItem from './ChatItem';
import MessageInput from './MessageInput';
import SharedPostItem from './SharedPostItem';
import {useGetChatMessage} from './hook';
import {useKeyboardVisible} from '~/utils/useKeyboardVisible';
import useHeader from '~/components/elemental/hooks/use_header';
import SharedStoryItem from './SharedStoryItem';
import SharedContact from './SharedContact';

const Chat = ({item}) => {
  const {user} = useAuthStore();
  const swipeableRef = useRef([]);
  const [replyTo, setReplyTo] = useState({});
  const [messageIdDelete, setMessageIdDelete] = useState(0);
  const [indexSelected, setIndexSelected] = useState(null);

  const {} = useHeader({hidden: true});
  const queryClient = useQueryClient();

  const {data: getDirectChat}: any = useGetDirectChat(
    {
      conversationId: item?.conversationId,
    },
    {enabled: !!item?.conversationId},
  );

  useEffect(() => {
    queryClient.invalidateQueries(
      ['notification_getUnreadMessageNotifications'],
      {exact: false},
    );
  }, [getDirectChat]);

  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    refetch,
  }: any = useGetChatMessage({
    where: item?.conversationId
      ? {
          conversationId: {
            eq: item?.conversationId,
          },
        }
      : {
          conversation: {
            and: [
              {
                or: [
                  {
                    secondUserId: {
                      eq: item?.id,
                    },
                  },
                  {
                    firstUserId: {
                      eq: item?.id,
                    },
                  },
                ],
              },
              {
                or: [
                  {
                    secondUserId: {
                      eq: user?.id,
                    },
                  },
                  {
                    firstUserId: {
                      eq: user?.id,
                    },
                  },
                ],
              },
            ],
          },
        },
    order: {
      createdDate: 'DESC',
    },
  });
  const chatToData = getDirectChat?.message_getConversation?.result;

  const closeRow = React.useCallback(() => {
    if (swipeableRef.current[indexSelected]) {
      swipeableRef.current[indexSelected].close();
    }
  }, [indexSelected]);

  const {mutate: removeUserMessage, isLoading: isRemoveMessageLoading} =
    useRemoveUserMessage();

  const onDelete = id => {
    removeUserMessage(
      {messageId: id},
      {
        onSuccess: data => {
          onCloseConfirmation();
          queryClient.invalidateQueries(['chat_messages']);
          queryClient.invalidateQueries(['message_getConversation']);
          if (data?.message_removeMessage?.code === 27) {
            Alert.alert('Only sender can delete the message');
          }
        },
        onError: error => {},
      },
    );
  };
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({item, index}) => {
    const isMine = user?.id === item?.senderId || user?.id === item?.senderId;
    const itemTypeRender = () => {
      switch (item?.mediaType) {
        case 'SHARED_POST':
          return <SharedPostItem item={item} isMine={isMine} />;
        case 'REPLY_STORY':
        case 'SHARED_STORY': {
          return <SharedStoryItem item={item} isMine={isMine} />;
        }
        case 'CONTACT':
          return <SharedContact item={item} isMine={isMine} />;
        case 'IMAGE':
          return <ChatImageItem item={item} isMine={isMine} />;
        default:
          return <ChatItem item={item} isMine={isMine} />;
      }
    };
    const rightSwipeActions = () => {
      return (
        <TouchableOpacity
          onPress={() => [setReplyTo(item), closeRow()]}
          style={styles.rightSwipe}>
          <ReplyIcon
            onPress={() => [setReplyTo(item), closeRow()]}
            large
            style={styles.rightMargin}
          />
          <TouchableOpacity
            onPress={() => [
              setMessageIdDelete(item?.id),
              setVisibleConfirm(true),
            ]}>
            <TrashIconSet />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    };
    const leftSwipeActions = () => {
      return (
        <TouchableOpacity
          onPress={() => [setReplyTo(item), closeRow()]}
          style={styles.leftSwipe}>
          <ReplyIcon
            onPress={() => [setReplyTo(item), closeRow()]}
            large
            style={styles.rightMargin}
          />
        </TouchableOpacity>
      );
    };
    const swipeWillOpen = (item, index) => {
      setIndexSelected(index);
    };
    return (
      <Swipeable
        key={item?.id}
        ref={ref => (swipeableRef.current[index] = ref)}
        onSwipeableWillOpen={() => swipeWillOpen(item, index)}
        renderRightActions={isMine ? rightSwipeActions : null}
        renderLeftActions={isMine ? null : leftSwipeActions}>
        {itemTypeRender()}
      </Swipeable>
    );
  };

  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const onCloseConfirmation = () => {
    setVisibleConfirm(false);
  };

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const ItemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  const keyExtractor = React.useCallback(
    (item: any, index: number) => `chat-${item?.id}_${index}`,
    [],
  );

  return (
    <>
      <GestureHandlerRootView style={styles.flex1}>
        <ChatBar item={item?.receiver?.[0] || chatToData?.secondUser || item} />
        <FlatList
          inverted
          ref={flatListRef}
          data={messages?.pages}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          ItemSeparatorComponent={ItemSeparatorComponent}
          onEndReached={onEndReached}
          refreshing={false}
          onRefresh={refetch}
          keyExtractor={keyExtractor}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={
            Platform.OS === 'ios' ? 60 : useKeyboardVisible() ? 0 : 80
          }>
          <MessageInput item={item} replyTo={replyTo} setReplyTo={setReplyTo} />
        </KeyboardAvoidingView>
      </GestureHandlerRootView>
      {visibleConfirm && (
        <ConfirmationActionSheet
          description="Are you sure you want to delete these messages?"
          onClose={onCloseConfirmation}
          onConfirmPress={() => onDelete(messageIdDelete)}
          isOpen={visibleConfirm}
          isLoading={isRemoveMessageLoading}
        />
      )}
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    marginTop: 20,
    paddingBottom: 100,
  },

  leftSwipe: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 30,
  },

  rightSwipe: {
    zIndex: 2,
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 30,
  },

  separator: {height: 10},

  flex1: {flex: 1},

  rightMargin: {
    right: 10,
  },
});
