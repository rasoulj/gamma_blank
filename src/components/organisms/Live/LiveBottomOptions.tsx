import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  HeartIconSet,
  KeyboardAvoidingView,
  SendIcon3,
  Typography,
  getColor,
} from '~/components/elemental';
import {deviceHeight, scale} from '~/utils/methods';
import {TextInput} from 'react-native-gesture-handler';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ShareModal from '~/components/molecules/ShareModal';
import useAuthStore from '~/stores/authStore';
import MessageInput from './MessageInput';
import CommentItem from './CommentItem';
import HeartAnimation from './HeartAnimation';
import dayjs from 'dayjs';
import {CustomActionSheet} from '~/components';
import {model} from '~/data/model';

const LiveBottomOptions = forwardRef(
  (
    {
      user,
      onSendMessage,
      sessionId,
      item,
    }: {
      user?: any;
      onSendMessage?: (text: string, type?: 'TEXT' | 'LIKE') => void;
      sessionId?: number;
      item: any;
    },
    ref,
  ) => {
    const currentUser = useAuthStore(state => state.user);
    const [visibleReply, setVisibleReply] = useState(false);
    const [visibleShareModal, setVisibleShareModal] = useState(false);
    const [messages, setMessages] = useState([]);

    const onCloseShareModal = () => {
      setVisibleShareModal(false);
    };
    const onSendPress = () => {
      setVisibleShareModal(true);
    };

    const inputRef = useRef<TextInput>();
    const onReplyPress = () => {
      setVisibleReply(true);
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 100);
    };
    const onCloseReply = (text?: string) => {
      setVisibleReply(false);
      text && onSendMessage(text);
    };

    const messgRef = useRef([]);
    const [likeRecieved, setLikeRecieved] = useState(false);
    const likeTimeRef = useRef<any>();
    const isBigLikeRef = useRef(false);

    useImperativeHandle(
      ref,
      () => ({
        onNewMessage: data => {
          try {
            const jsonData = JSON.parse(data);
            if (jsonData?.type === 'LIKE') {
              if (
                likeTimeRef.current &&
                dayjs().diff(likeTimeRef.current, 'seconds') < 5
              )
                isBigLikeRef.current = true;
              else isBigLikeRef.current = false;
              likeTimeRef.current = new Date();
              setLikeRecieved(true);
              setTimeout(() => {
                setLikeRecieved(false);
              }, 1500);
            } else {
              let temp = [...messgRef.current];
              temp.push(JSON.parse(data));
              messgRef.current.push(JSON.parse(data));
              setMessages(temp.reverse());
            }
          } catch (error) {}
        },
      }),
      [],
    );

    const [hideItems, setHideItems] = useState(false);
    const renderComment = useCallback(({item, index}) => {
      const onPress = () => {
        if (index === 0) setHideItems(prev => !prev);
        else {
          setHideItems(true);
        }
      };
      return (
        <TouchableOpacity
          onPress={onPress}
          style={{opacity: index === 0 ? 1 : 0.7}}>
          <CommentItem
            user={item?.user}
            extraData={item?.message}
            avatarSize={scale(30)}
            color="gray.50"
          />
        </TouchableOpacity>
      );
    }, []);

    const onOutsidePress = () => onCloseReply();

    const onLikePress = () => {
      onSendMessage(`${Math.random()}`, 'LIKE');
    };

    return (
      <>
        <TouchableWithoutFeedback onPress={onOutsidePress}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={60}
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.innerContainer}>
              <View style={styles.listWrapper}>
                <FlatList
                  data={hideItems ? [messages[0]] : messages}
                  renderItem={renderComment}
                  style={styles.height}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  inverted
                  keyExtractor={(item, index) => `${index}`}
                />
                {likeRecieved && (
                  <View style={styles.heartAnimContainer}>
                    <HeartAnimation isMultiLike={isBigLikeRef.current} />
                  </View>
                )}
              </View>
              <View>
                <View style={styles.options}>
                  {model?.metaData?.configs?.socialLive?.comment && (
                    <TouchableOpacity
                      onPress={onReplyPress}
                      style={styles.replyTouchable}>
                      <View style={styles.commentContainer}>
                        <Typography
                          fontWeight="700"
                          fontSize="sm"
                          color="gray.800">
                          Add a comment ...
                        </Typography>
                      </View>
                    </TouchableOpacity>
                  )}
                  {((model?.metaData?.configs?.socialLive?.like &&
                    user?.id != currentUser?.id) ||
                    model?.metaData?.configs?.socialLive?.share) && (
                    <View style={[styles.commentContainer, styles.sendOptions]}>
                      {user?.id != currentUser?.id &&
                        model?.metaData?.configs?.socialLive?.like && (
                          <TouchableOpacity onPress={onLikePress}>
                            <HeartIconSet
                              color={getColor({color: 'gray.800'})}
                              width={24}
                              fill={'transparent'}
                              height={24}
                              style={styles.heartIcon}
                            />
                          </TouchableOpacity>
                        )}
                      {model?.metaData?.configs?.socialLive?.share && (
                        <SendIcon3
                          color={getColor({color: 'gray.800'})}
                          width={24}
                          height={24}
                          onPress={onSendPress}
                        />
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        {visibleShareModal && (
          <ShareModal
            mediaType="SHARE_LIVE_STREAM"
            isVisible={visibleShareModal}
            onClose={onCloseShareModal}
            deepLink={`liveUser?entityId=${item?.id}&sessionId=${item?.sessionId}&fullName=${item?.creator?.fullName}&photo=${item?.creator?.photoUrl}`}
            item={item}
          />
        )}
        {visibleReply && (
          <CustomActionSheet
            isVisible={visibleReply}
            onClose={() => setVisibleReply(false)}>
            <View style={styles.messageInput}>
              <View style={styles.innerMessage}>
                <MessageInput onSendMessage={onCloseReply} />
              </View>
            </View>
          </CustomActionSheet>
        )}
      </>
    );
  },
);
export default memo(LiveBottomOptions);

const styles = StyleSheet.create({
  height: {maxHeight: 150, bottom: 0},

  separator: {height: 8},

  row: {flexDirection: 'row'},

  innerMessage: {
    borderTopRadius: 10,
    marginTop: 12,
    backgroundColor: 'background.200',
    justifyContent: 'center',
  },

  messageInput: {
    width: '100%',
    paddingTop: 5,
    paddingBottom: 30,
  },

  flex1: {flex: 1, zIndex: -1},

  innerContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },

  heartIcon: {marginRight: 26},

  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    height: deviceHeight,
    paddingHorizontal: 16,
  },

  options: {
    width: '100%',
    marginBottom: scale(20),
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  replyTouchable: {flex: 1, marginEnd: 16},

  commentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  sendOptions: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },

  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  heartAnimContainer: {position: 'absolute', bottom: 60, right: 20},
});
