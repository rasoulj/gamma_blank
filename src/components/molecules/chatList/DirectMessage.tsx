import React, {useEffect, useState, memo, useCallback} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  Screen,
  Typography,
  Card,
  Layer,
  IMG,
  useNavigate,
  BackIcon,
  RelativeLayout,
  Button,
  FormInput,
  SendIcon2,
  Trash2Icon,
  DrawerKit,
  useDrawer,
  useToast,
  relativeTimeFromNow,
  getColor,
  NCameraIcon,
  ReplyIcon,
  User2Icon,
  useAuth,
  useKeyboard,
} from '~/components/elemental';
import * as Element from '~/components/elemental';

import {
  useCreateDirectMessage,
  useGetConversationId,
  useGetDirectChat,
  useRemoveUserMessage,
  useUpdateUserMessage,
} from '../../elemental/hooks/use_get_chat';
import {useQueryClient} from 'react-query';
import {FormProvider, useForm} from 'react-hook-form';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import useUploader from '../../elemental/hooks/useUploader';
import useTrackedStore from '~/stores/store';
import {getTextColor} from '~/theme';
import {applyColorTo} from '~/utils/helper';
import SharedPostItem from './SharedPostItem';

const DirectMessage = ({navigation}) => {
  const {params} = navigation;
  const {chatKey, setChatKey} = useTrackedStore();
  const {navigateWithName} = useNavigate();
  const {id, fullName, photoUrl} = params?.item;

  const {keyboardHeight, keyboardVisible} = useKeyboard();

  const {toast} = useToast();

  const {user} = useAuth();

  const {...methods} = useForm<Record<string, any>, object>({
    mode: 'onChange',
  });

  const {handleSubmit, register, reset} = methods;

  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);
  const [selectable, setSelectable] = useState(false);

  const [isReply, setIsReply] = useState(false);
  const [message, setMessage] = useState(null);

  const swipeableRef = React.useRef([]);
  const scrollRef = React.useRef(null);

  const {data: getConversationId} = useGetConversationId();
  const conversationsMaps =
    getConversationId?.message_getUserMessages?.result?.items;

  const filteredArr = conversationsMaps?.filter(obj => {
    return obj?.receiver?.some(receiver => receiver?.id === id);
  });
  const conversationIds = filteredArr?.map(obj => obj?.conversationId);
  const conversationId = conversationIds?.[0];

  useEffect(() => {
    if (conversationId === chatKey?.conversationId) return;

    setChatKey({conversationId});
  }, [chatKey, setChatKey, conversationId]);

  const {
    data: getDirectChat,
    error,
    isLoading: getDirectLoading,
    refetch,
    isRefetching,
  } = useGetDirectChat(
    {
      conversationId,
    },
    {enabled: !!conversationId},
  );

  const chatToData = getDirectChat?.message_getConversation?.result;

  const {
    onPress: uploadMedia,
    values: galleryValues,
    cleanImage,
    isLoading: galleryUploadLoading,
  } = useUploader({
    type: 'photo',
    name: 'photo',
    isCamera: true,
    isGallery: true,
  });

  const {mutate: directMessage, isLoading: directMessageLoading} =
    useCreateDirectMessage();

  function sendMessage(values) {
    const input = {
      text: values?.text,
      conversationId: conversationIds?.[0] ? conversationIds?.[0] : null,
      parentId: isReply ? message?.id : null,
      mediaType: galleryValues?.photo ? 'IMAGE' : 'NONE',
      mediaUrl: galleryValues?.photo,
      receiverId: params?.item?.id,
    };

    directMessage(input, {
      onSuccess: success => {
        reset();
        queryClient.invalidateQueries('message_getUserMessages');
        queryClient.invalidateQueries('message_getConversation');
        queryClient.invalidateQueries('getUserMessages');
        setSelectable(false);
        setSelected([]);
        setIsReply(false);
        setMessage(null);
        setInputFocus(false);
        cleanImage();
        console.log('Success', success);
      },
      onError: error => {
        reset();
        console.log('error', error);
      },
    });
  }

  const {isOpen: isDeleteDrawerKitOpen, setIsOpen: setIsDeleteDrawerKitOpen} =
    useDrawer('DeleteDrawerKit');

  const {mutate: removeUserMessage, isLoading: removeMessageLoading} =
    useRemoveUserMessage();

  const onDelete = id => {
    removeUserMessage(
      {messageId: id},
      {
        onSuccess: data => {
          console.log(data);
          setSelectable(false);
          setSelected([]);
          setIsReply(false);
          setMessage(null);
          setIsDeleteDrawerKitOpen(false);
          queryClient.invalidateQueries(['message_getConversation']);
          if (data?.message_removeMessage?.code === 27) {
            Alert.alert('Only sender can delete the message');
          }
          // toast({message: 'Your message(s) deleted!'});
        },
        onError: error => {
          console.log(error);
          toast({message: error.toString()});
        },
      },
    );
  };

  let lastMessage = chatToData?.messages?.length - 1;

  useEffect(() => {
    if (lastMessage) {
      scrollRef?.current?.scrollToIndex({
        animated: true,
        index: lastMessage,
      });
    }
  }, [conversationId, lastMessage, keyboardVisible]);

  const isCurrectUser =
    params?.item === chatToData?.secondUser?.id
      ? chatToData?.secondUser?.id
      : chatToData?.firstUser?.id;

  const LeftSwipeActions = () => {
    return (
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            // width: 100,
          },
        ]}>
        <ReplyIcon large />
      </Animated.View>
    );
  };
  const [inputFocus, setInputFocus] = React.useState(false);

  const [indexSelected, setIndexSelected] = useState(null);

  const closeRow = React.useCallback(() => {
    if (swipeableRef.current[indexSelected]) {
      swipeableRef.current[indexSelected].close();
    }
  }, [indexSelected]);

  const swipeFromLeftOpen = () => {
    setInputFocus(true);
    closeRow();
  };

  const swipeWillOpen = (item, index) => {
    setMessage(item);
    setIsReply(!isReply);
    setIndexSelected(index);
  };

  const ChatRenderItem = ({item, index}) => {
    const isCurrent = item?.senderId === user?.id;

    return (
      <Swipeable
        ref={ref => (swipeableRef.current[index] = ref)}
        renderLeftActions={LeftSwipeActions}
        onSwipeableWillOpen={() => swipeWillOpen(item, index)}
        onSwipeableLeftOpen={swipeFromLeftOpen}>
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            if (!selectable) return;

            setSelected(item.id);
          }}
          onLongPress={() => {
            setSelectable(true);
            setSelected(item.id);
          }}>
          {item?.senderId === user?.id
            ? renderItemReciver(item, isCurrent)
            : renderItem(item, isCurrent)}
        </TouchableWithoutFeedback>
      </Swipeable>
    );
  };

  function renderItem(item, isCurrent) {
    const isSelected = selectable && selected === item?.id;
    if (item?.parentId === null) {
      if (item?.mediaType === 'IMAGE') {
        return (
          <Layer
            style={{
              flexDirection: 'row',
              marginTop: 12,
              width: '100%',
            }}>
            <Layer
              style={{
                width: '80%',
                right: isSelected ? 50 : 0,
              }}>
              <RelativeLayout
                // backgroundColor={'dark.800'}
                style={{
                  justifyContent: 'flex-start',
                }}>
                <IMG
                  src={item?.mediaUrl}
                  style={{
                    width: 243,
                    height: 136,
                    borderRadius: 15,
                    borderWidth: isCurrent ? 1 : 0,
                    borderColor: getColor({color: 'background.600'}),
                  }}
                />
              </RelativeLayout>
              <Typography
                style={{
                  color: 'gray.500',
                  textAlign: 'left',
                  marginLeft: 3,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {relativeTimeFromNow(item?.createdAt)}
              </Typography>
            </Layer>
            <Layer
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isSelected && (
                <Layer
                  style={{
                    flexDirection: 'row',
                    marginRight: 20,
                  }}>
                  <ReplyIcon
                    large
                    onPress={() => {
                      setMessage(item);
                      setIsReply(!isReply);
                      setInputFocus(true);
                    }}
                    style={{
                      right: 10,
                    }}
                  />
                  {/* <Trash2Icon
                  con
                  color="#292D32"
                  onPress={() => {
                    setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                  }}
                /> */}
                </Layer>
              )}
            </Layer>
          </Layer>
        );
      } else if (item?.mediaType === 'SHARED_POST') {
        return <SharedPostItem item={item} />;
      } else {
        return (
          <Layer
            style={{
              flexDirection: 'row',
              marginTop: 12,
              width: '100%',
            }}>
            <Layer
              style={{
                maxWidth: '80%',
                right: isSelected ? 50 : 0,
              }}>
              <RelativeLayout
                backgroundColor={applyColorTo(['mystery', 'modern'], {
                  trueColor: 'background.400',
                  falseColor: 'background.600',
                })}
                style={{
                  justifyContent: 'flex-start',
                  padding: 16,
                  borderRadius: 15,
                }}>
                {/* <Hyperlink linkDefault={true}>
                  <Typography
                    style={{
                      lineHeight: 20,
                      fontSize: 17,
                      color: getTextColor(
                        getColor({
                          color: Element.isDark
                            ? 'background.400'
                            : 'background.600',
                        }),
                      ),
                    }}>
                    {item?.text}
                  </Typography>
                </Hyperlink> */}
              </RelativeLayout>
              <Typography
                style={{
                  color: 'dark.300',
                  textAlign: 'left',
                  marginLeft: 3,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {relativeTimeFromNow(item?.createdAt)}
              </Typography>
            </Layer>
            <Layer
              style={{
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isSelected && (
                <Layer
                  style={{
                    flexDirection: 'row',
                    marginRight: 20,
                  }}>
                  <ReplyIcon
                    onPress={() => {
                      setMessage(item);
                      setIsReply(!isReply);
                      setInputFocus(true);
                    }}
                    large
                    style={{
                      right: 10,
                    }}
                  />
                  {/* <Trash2Icon
                  color="#292D32"
                  onPress={() =>
                    setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen)
                  }
                /> */}
                </Layer>
              )}
            </Layer>
          </Layer>
        );
      }
    } else {
      return renderReply(item, isCurrent);
    }
  }

  function renderItemReciver(item, isCurrent) {
    const isSelected = selectable && selected === item?.id;
    if (item?.parentId === null) {
      if (item?.mediaType === 'IMAGE') {
        return (
          <Layer
            style={{
              flexDirection: 'row',
              marginTop: 12,
              // width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: 1,
            }}>
            <Layer
              style={{
                width: '80%',
                right: isSelected ? 50 : 0,
              }}>
              <RelativeLayout
                // backgroundColor={'dark.800'}
                style={{
                  // justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  // padding: 16,
                }}>
                <IMG
                  src={item?.mediaUrl}
                  style={{
                    width: 243,
                    height: 136,
                    borderRadius: 15,
                    borderWidth: isCurrent ? 1 : 0,
                    borderColor: getColor({color: 'primary.500'}),
                  }}
                  resizeMode="cover"
                />
              </RelativeLayout>
              <Typography
                style={{
                  color: 'gray.500',
                  textAlign: 'right',
                  marginLeft: 10,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {relativeTimeFromNow(item?.createdAt)}
              </Typography>
            </Layer>
            {isSelected && (
              <Layer
                style={{
                  width: '20%',
                  // height: 160,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Layer
                  style={{
                    flexDirection: 'row',
                    marginRight: 20,
                  }}>
                  <ReplyIcon
                    onPress={() => {
                      setMessage(item);
                      setIsReply(!isReply);
                      setInputFocus(true);
                    }}
                    color="#292D32"
                    large
                    style={{
                      right: 10,
                    }}
                  />
                  <Trash2Icon
                    onPress={() => {
                      setMessage(item);
                      setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                    }}
                  />
                </Layer>
              </Layer>
            )}
          </Layer>
        );
      } else if (item?.mediaType === 'SHARED_POST') {
        return <SharedPostItem item={item} />;
      } else {
        return (
          <Layer
            style={{
              flexDirection: 'row',
              marginTop: 12,
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Layer
              style={{
                maxWidth: '80%',
                right: isSelected ? 50 : 0,
                // justifyContent: 'flex-end',
                // alignItems: 'flex-end',
              }}>
              <RelativeLayout
                backgroundColor={'primary.500'}
                style={{
                  justifyContent: 'flex-end',
                  padding: 16,
                  borderRadius: 15,
                }}>
                <Hyperlink linkDefault={true}>
                  <Typography
                    style={{
                      lineHeight: 20,
                      fontSize: 17,
                    }}>
                    {item?.text}
                  </Typography>
                </Hyperlink>
              </RelativeLayout>
              <Typography
                style={{
                  color: 'gray.500',
                  textAlign: 'right',
                  marginLeft: 10,
                  fontSize: 12,
                  marginTop: 5,
                }}>
                {relativeTimeFromNow(item?.createdAt)}
              </Typography>
            </Layer>
            {isSelected && (
              <Layer
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Layer
                  style={{
                    flexDirection: 'row',
                    marginRight: 20,
                    marginBottom: 10,
                  }}>
                  <ReplyIcon
                    large
                    onPress={() => {
                      setMessage(item);
                      setIsReply(!isReply);
                      setInputFocus(true);
                    }}
                    style={{
                      right: 10,
                    }}
                  />
                  <Trash2Icon
                    onPress={() => {
                      setMessage(item);
                      setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                    }}
                  />
                </Layer>
              </Layer>
            )}
          </Layer>
        );
      }
    } else {
      return renderReplyReciver(item, isCurrent);
    }
  }

  function renderReplyReciver(item, isCurrent) {
    const isSelected = selectable && selected === item?.id;

    if (item?.parent?.mediaType === 'IMAGE') {
      return (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!selectable) return;

              setSelected(item.id);
            }}
            onLongPress={() => {
              setSelectable(true);
              setSelected(item.id);
            }}>
            <Layer
              style={{
                marginVertical: 5,
                width: '100%',
                flexDirection: 'row',
                right: isSelected ? 20 : 0,
                marginTop: 12,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <RelativeLayout
                style={{
                  backgroundColor: getColor({color: 'primary.500'}),
                  maxWidth: '80%',
                  borderRadius: 15,
                  padding: 16,
                }}>
                <Layer style={{flexDirection: 'row'}}>
                  <Layer
                    style={{
                      width: 4,
                      height: 36,
                      backgroundColor: applyColorTo(
                        ['simple', 'friendly', 'mystery'],
                        {
                          trueColor: '#000000',
                          falseColor: '#ffffff',
                        },
                      ),
                    }}
                  />
                  <Layer
                    style={{
                      width: 36,
                      height: 36,
                      // backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 3,
                      marginLeft: 2,
                    }}>
                    <IMG
                      src={item?.parent?.mediaUrl}
                      style={{width: 30, height: 22}}
                    />
                  </Layer>
                  <RelativeLayout
                    backgroundColor={'primary.500'}
                    style={{
                      // borderRadius: 15,
                      width: '68%',
                      marginLeft: 4,
                      padding: 0,
                    }}>
                    <Typography
                      style={{
                        // lineHeight: 20,
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {isCurrent ? 'You' : chatToData?.secondUser?.fullName}
                    </Typography>
                    <Typography style={{lineHeight: 20, fontSize: 14}}>
                      Photo
                    </Typography>
                  </RelativeLayout>
                </Layer>
                {item?.mediaType === 'IMAGE' ? (
                  <RelativeLayout
                    // backgroundColor={'dark.800'}
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <IMG
                      src={item?.mediaUrl}
                      style={{
                        width: 243,
                        height: 136,
                        borderRadius: 15,
                        marginTop: 5,
                        // borderWidth: secondUser ? 1 : 0,
                        borderColor: getColor({color: 'primary.400'}),
                      }}
                      resizeMode="cover"
                    />
                  </RelativeLayout>
                ) : (
                  <Hyperlink linkDefault={true}>
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginTop: 5,
                      }}>
                      {item?.text}
                    </Typography>
                  </Hyperlink>
                )}
              </RelativeLayout>
              {isSelected && (
                <Layer
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Layer
                    style={{
                      flexDirection: 'row',
                      marginLeft: 40,
                    }}>
                    <ReplyIcon
                      large
                      onPress={() => {
                        setMessage(item);
                        setIsReply(!isReply);
                        setInputFocus(true);
                      }}
                      style={{
                        right: 10,
                      }}
                    />
                    <Trash2Icon
                      onPress={() => {
                        setMessage(item);
                        setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                      }}
                    />
                  </Layer>
                </Layer>
              )}
            </Layer>
          </TouchableWithoutFeedback>
          <Layer
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}>
            <Typography
              style={{
                color: 'gray.500',
                textAlign: 'right',
                marginLeft: 10,
                fontSize: 12,
                marginTop: 5,
              }}>
              {relativeTimeFromNow(item?.createdAt)}
            </Typography>
          </Layer>
        </>
      );
    } else {
      return (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!selectable) return;

              setSelected(item.id);
            }}
            onLongPress={() => {
              setSelectable(true);
              setSelected(item.id);
            }}>
            <Layer
              style={{
                marginVertical: 5,
                width: '100%',
                // flex: 1,
                flexDirection: 'row',
                right: isSelected ? 20 : 0,
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 12,
              }}>
              <Layer
                style={{
                  backgroundColor: getColor({color: 'primary.500'}),
                  maxWidth: '80%',
                  borderRadius: 15,
                  padding: 16,
                }}>
                <Layer
                  style={{
                    flexDirection: 'row',
                    // maxWidth: '80%',
                  }}>
                  <Layer
                    style={{
                      width: 4,
                      height: 36,
                      backgroundColor: applyColorTo(
                        ['simple', 'friendly', 'mystery'],
                        {
                          trueColor: '#000000',
                          falseColor: '#ffffff',
                        },
                      ),
                    }}
                  />
                  <RelativeLayout
                    backgroundColor={'primary.500'}
                    style={{
                      // width: '68%',
                      marginLeft: 10,
                      padding: 0,
                    }}>
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      {isCurrent ? 'You' : chatToData?.secondUser?.fullName}
                    </Typography>
                    <Hyperlink linkDefault={true}>
                      <Typography
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                        }}>
                        {item?.parent?.text}
                      </Typography>
                    </Hyperlink>
                  </RelativeLayout>
                </Layer>
                {item?.mediaType === 'IMAGE' ? (
                  <RelativeLayout
                    // backgroundColor={'dark.800'}
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <IMG
                      src={item?.mediaUrl}
                      style={{
                        width: 243,
                        height: 136,
                        borderRadius: 15,
                        marginTop: 5,
                        // borderWidth: secondUser ? 1 : 0,
                        borderColor: getColor({color: 'primary.400'}),
                      }}
                      resizeMode="cover"
                    />
                  </RelativeLayout>
                ) : (
                  <Hyperlink linkDefault={true}>
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginTop: 5,
                        // color: '#fff',
                      }}>
                      {item?.text}
                    </Typography>
                  </Hyperlink>
                )}
              </Layer>
              {isSelected && (
                <Layer
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Layer
                    style={{
                      flexDirection: 'row',
                      marginLeft: 40,
                    }}>
                    <ReplyIcon
                      large
                      onPress={() => {
                        setMessage(item);
                        setIsReply(!isReply);
                        setInputFocus(true);
                      }}
                      style={{
                        right: 10,
                      }}
                    />
                    <Trash2Icon
                      onPress={() => {
                        setMessage(item);
                        setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                      }}
                    />
                  </Layer>
                </Layer>
              )}
            </Layer>
          </TouchableWithoutFeedback>
          <Layer
            style={{
              flex: 1,
              alignItems: 'flex-end',
              marginRight: isSelected ? 85 : 0,
            }}>
            <Typography
              style={{
                color: 'gray.500',
                textAlign: 'right',
                marginLeft: 10,
                fontSize: 12,
                marginTop: 5,
              }}>
              {relativeTimeFromNow(item?.createdAt)}
            </Typography>
          </Layer>
        </>
      );
    }
  }

  function renderReply(item, isCurrent) {
    const isSelected = selectable && selected === item?.id;

    if (item?.parent?.mediaType === 'IMAGE') {
      return (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!selectable) return;

              setSelected(item.id);
            }}
            onLongPress={() => {
              setSelectable(true);
              setSelected(item.id);
            }}>
            <Layer
              style={{
                marginTop: 12,
                width: '100%',
                flexDirection: 'row',
                right: isSelected ? 20 : 0,
              }}>
              <RelativeLayout
                backgroundColor={applyColorTo(['mystery', 'modern'], {
                  trueColor: 'background.400',
                  falseColor: 'background.600',
                })}
                style={{
                  maxWidth: '80%',
                  borderRadius: 15,
                  padding: 16,
                }}>
                <Layer style={{flexDirection: 'row'}}>
                  <Layer
                    style={{
                      width: 4,
                      height: 36,
                      backgroundColor: applyColorTo(
                        ['simple', 'friendly', 'mystery'],
                        {
                          trueColor: '#000000',
                          falseColor: '#ffffff',
                        },
                      ),
                    }}
                  />
                  <Layer
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 3,
                      marginLeft: 2,
                    }}>
                    <IMG
                      src={item?.parent?.mediaUrl}
                      style={{width: 30, height: 22}}
                    />
                  </Layer>
                  <RelativeLayout
                    backgroundColor={applyColorTo(['mystery', 'modern'], {
                      trueColor: 'background.400',
                      falseColor: 'background.600',
                    })}
                    style={{
                      width: '68%',
                      marginLeft: 4,
                      padding: 0,
                    }}>
                    <Typography
                      style={{
                        // lineHeight: 20,
                        fontSize: 16,
                        fontWeight: '600',
                        color: getColor({color: 'primary.500'}),
                      }}>
                      {isCurrent ? 'You' : chatToData?.firstUser?.fullName}
                    </Typography>
                    <Typography style={{lineHeight: 20, fontSize: 14}}>
                      Photo
                    </Typography>
                  </RelativeLayout>
                </Layer>
                {item?.mediaType === 'IMAGE' ? (
                  <RelativeLayout
                    // backgroundColor={'dark.800'}
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <IMG
                      src={item?.mediaUrl}
                      style={{
                        width: 243,
                        height: 136,
                        borderRadius: 15,
                        marginTop: 5,
                        // borderWidth: secondUser ? 1 : 0,
                        borderColor: getColor({color: 'primary.500'}),
                      }}
                      resizeMode="cover"
                    />
                  </RelativeLayout>
                ) : (
                  <Hyperlink linkDefault={true}>
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginTop: 5,
                      }}>
                      {item?.text}
                    </Typography>
                  </Hyperlink>
                )}
              </RelativeLayout>
              {isSelected && (
                <Layer
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Layer
                    style={{
                      flexDirection: 'row',
                      marginLeft: 40,
                    }}>
                    <ReplyIcon
                      large
                      onPress={() => {
                        setMessage(item);
                        setIsReply(!isReply);
                        setInputFocus(true);
                      }}
                      style={{
                        right: 10,
                      }}
                    />
                    {/* <Trash2Icon
                      color="#292D32"
                      onPress={() => {
                        setMessage(item);
                        setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                      }}
                    /> */}
                  </Layer>
                </Layer>
              )}
            </Layer>
          </TouchableWithoutFeedback>
          <Layer
            style={{
              flex: 1,
              alignItems: 'flex-start',
            }}>
            <Typography
              style={{
                color: 'gray.500',
                textAlign: 'right',
                marginLeft: 10,
                fontSize: 12,
                marginTop: 5,
              }}>
              {relativeTimeFromNow(item?.createdAt)}
            </Typography>
          </Layer>
        </>
      );
    } else {
      return (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              if (!selectable) return;

              setSelected(item.id);
            }}
            onLongPress={() => {
              setSelectable(true);
              setSelected(item.id);
            }}>
            <Layer
              style={{
                marginTop: 12,
                width: '100%',
                // flex: 1,
                flexDirection: 'row',
                right: isSelected ? 20 : 0,
              }}>
              <RelativeLayout
                backgroundColor={applyColorTo(['mystery', 'modern'], {
                  trueColor: 'background.400',
                  falseColor: 'background.600',
                })}
                style={{
                  maxWidth: '80%',
                  borderRadius: 15,
                  padding: 16,
                }}>
                <Layer
                  style={{
                    flexDirection: 'row',
                    // maxWidth: '80%',
                  }}>
                  <Layer
                    style={{
                      width: 4,
                      height: 36,
                      backgroundColor: applyColorTo(
                        ['simple', 'friendly', 'mystery'],
                        {
                          trueColor: '#000000',
                          falseColor: '#ffffff',
                        },
                      ),
                    }}
                  />
                  <RelativeLayout
                    backgroundColor={applyColorTo(['mystery', 'modern'], {
                      trueColor: 'background.400',
                      falseColor: 'background.600',
                    })}
                    style={{
                      // width: '68%',
                      marginLeft: 10,
                      padding: 0,
                    }}>
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: getColor({color: 'primary.500'}),
                      }}>
                      {isCurrent ? 'You' : chatToData?.firstUser?.fullName}
                    </Typography>
                    <Hyperlink linkDefault={true}>
                      <Typography
                        style={{
                          fontSize: 14,
                          fontWeight: '400',
                        }}>
                        {item?.parent?.text}
                      </Typography>
                    </Hyperlink>
                  </RelativeLayout>
                </Layer>
                {item?.mediaType === 'IMAGE' ? (
                  <RelativeLayout
                    // backgroundColor={'dark.800'}
                    style={{
                      alignItems: 'flex-end',
                    }}>
                    <IMG
                      src={item?.mediaUrl}
                      style={{
                        width: 243,
                        height: 136,
                        borderRadius: 15,
                        marginTop: 5,
                        // borderWidth: secondUser ? 1 : 0,
                        borderColor: getColor({color: 'primary.500'}),
                      }}
                      resizeMode="cover"
                    />
                  </RelativeLayout>
                ) : (
                  <Hyperlink linkDefault={true}>
                    <Typography
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginTop: 5,
                      }}>
                      {item?.text}
                    </Typography>
                  </Hyperlink>
                )}
              </RelativeLayout>
              {isSelected && (
                <Layer
                  style={{
                    width: '20%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Layer
                    style={{
                      flexDirection: 'row',
                      marginLeft: 40,
                    }}>
                    <ReplyIcon
                      large
                      onPress={() => {
                        setMessage(item);
                        setIsReply(!isReply);
                        setInputFocus(true);
                      }}
                      style={{
                        right: 10,
                      }}
                    />
                    {/* <Trash2Icon
                      color="#292D32"
                      onPress={() => {
                        setMessage(item);
                        setIsDeleteDrawerKitOpen(!isDeleteDrawerKitOpen);
                      }}
                    /> */}
                  </Layer>
                </Layer>
              )}
            </Layer>
          </TouchableWithoutFeedback>
          <Layer
            style={{
              flex: 1,
              alignItems: 'flex-start',
              marginLeft: isSelected ? 85 : 0,
            }}>
            <Typography
              style={{
                color: 'gray.500',
                textAlign: 'right',
                marginLeft: 10,
                fontSize: 12,
                marginTop: 5,
              }}>
              {relativeTimeFromNow(item?.createdAt)}
            </Typography>
          </Layer>
        </>
      );
    }
  }

  return (
    <>
      <Screen isLoading={getDirectLoading}>
        <Card
          style={{
            height: 60,
            borderRadius: 10,
            shadowOffset: {width: 0, height: 2},
            shadowColor: 'rgb(0,0,0)',
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 10,
            zIndex: 10,
            marginVertical: 10,
            marginHorizontal: 5,
            // justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
          }}>
          <BackIcon
            color="gray.400"
            onPress={() => {
              if (selectable) {
                return (
                  setSelectable(false),
                  setSelected([]),
                  setIsReply(false),
                  setMessage(null)
                  // setSelectedUpdateMessage('')
                );
              } else if (navigation) {
                navigation.goBack();
              } else {
                return undefined;
              }
            }}
          />
          <TouchableOpacity
            onPress={() => navigateWithName('profile', {item: params?.item})}>
            {photoUrl ? (
              <IMG
                src={photoUrl}
                alt="profile"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 50,
                }}
              />
            ) : (
              <User2Icon width={42} height={42} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}
            onPress={() => navigateWithName('profile', {item: params?.item})}>
            <Layer>
              <Typography
                numberOfLines={1}
                ellipsizeMode="head"
                style={{
                  marginLeft: 10,
                  fontWeight: 'bold',
                }}>
                {fullName}
              </Typography>
              <Typography
                numberOfLines={1}
                ellipsizeMode="head"
                style={{
                  marginLeft: 10,
                  color: 'gray.500',
                  fontSize: 14,
                  marginTop: 4,
                  //   fontWeight: 'bold',
                }}>
                last seen at{' '}
                {relativeTimeFromNow(
                  isCurrectUser
                    ? chatToData?.secondUser?.lastModifiedDate
                    : chatToData?.firstUser?.lastModifiedDate,
                )}
              </Typography>
            </Layer>
          </TouchableOpacity>
        </Card>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={chatToData?.messages}
          keyExtractor={(item, index) => index?.toString()}
          refreshing={isRefetching}
          onRefresh={refetch}
          ref={scrollRef}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: keyboardVisible ? keyboardHeight : '5%',
          }}
          onScrollToIndexFailed={error => {
            scrollRef?.current?.scrollToOffset({
              offset: error.averageItemLength * error.index,
              animated: true,
            });
            setTimeout(() => {
              if (
                chatToData?.messages?.length - 1 !== 0 &&
                scrollRef !== null
              ) {
                scrollRef?.current?.scrollToIndex({
                  index: error.index,
                  animated: true,
                });
              }
            }, 100);
          }}
          style={{
            flex: 1,
          }}
          renderItem={ChatRenderItem}
        />

        <DrawerKit
          data-id="delete-drawer-kit"
          data-name="DrawerKit"
          style={{position: 'relative', zIndex: 5}}
          position="bottom"
          data-parent="screen">
          <View
            data-id="123-456-789-delete-layer"
            data-name="RelativeLayout"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 10,
              width: '100%',
            }}
            data-parent="delete-drawer-kit">
            <Layer
              data-id="content-delete-layer"
              data-name="Layer"
              style={{position: 'relative', marginLeft: 20, marginRight: 20}}
              data-parent="123-456-789-delete-layer">
              <Typography
                data-id="01a2347f-c1fd-41d4-9f49-263cdc16f9d9"
                data-name="Typography"
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 17,
                  marginTop: 8,
                }}
                data-parent="content-delete-layer">
                Confirmation
              </Typography>
              <Typography
                data-id="532f9254-679b-458d-afae-6fb62c9f191e"
                data-name="Typography"
                style={{
                  position: 'relative',
                  marginTop: 23,
                  marginBottom: 32,
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'left',
                  fontSize: 17,
                }}
                data-parent="content-delete-layer">
                Are you sure you want to delete these messages?
              </Typography>
              <Layer
                data-id="button_box"
                data-name="Layer"
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  width: '100%',
                }}
                data-parent="content-delete-layer">
                <Button
                  data-id="cancel_btn"
                  data-name="Button"
                  style={{position: 'relative', borderRadius: 20, width: '45%'}}
                  variant="outline"
                  data-parent="button_box"
                  onPress={() => {
                    setSelectable(false);
                    setSelected([]);
                    setIsReply(false);
                    setMessage(null);
                    setIsDeleteDrawerKitOpen(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  data-id="delete_btn"
                  data-name="Button"
                  style={{position: 'relative', borderRadius: 20, width: '45%'}}
                  colorScheme="error.500"
                  bgColor="error.500"
                  variant="solid"
                  data-parent="button_box"
                  // isLoading={removeMessageLoading}
                  onPress={e => {
                    onDelete(message?.id);
                    // const removeMessage = messageID.map(
                    //   async item => await onDelete(item),
                    // );
                    //   console.log({messageID});
                    // }}
                    // Promise.all(removeMessage)
                    //   .then(() =>
                    // queryClient.invalidateQueries([
                    //   'message_getConversation',
                    // ]),
                    //   )
                    //   .catch(err => console.log(err));
                  }}>
                  Delete
                </Button>
              </Layer>
            </Layer>
          </View>
        </DrawerKit>
      </Screen>
      {!getDirectLoading && (
        <RelativeLayout
          avoidKeyborad={true}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : -220}
          style={
            {
              // position: 'absolute',
              // bottom: 0,
              // left: 0,
              // right: 0,
            }
          }>
          <FormProvider {...methods}>
            {isReply ? (
              <>
                <RelativeLayout
                  backgroundColor={'primary.100'}
                  style={{
                    marginHorizontal: 16,
                    padding: 8,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '90%',
                    borderRadius: 8,
                    height: 50,
                    marginBottom: 10,
                    shadowOffset: {width: 0, height: 2},
                    shadowColor: 'rgb(0,0,0)',
                    shadowOpacity: 0.25,
                    shadowRadius: 5,
                    elevation: 10,
                  }}>
                  <Layer
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: getColor({color: 'primary.400'}),
                    }}>
                    <ReplyIcon large color="#fff" />
                  </Layer>
                  {message?.mediaType === 'IMAGE' ? (
                    <>
                      <Layer
                        style={{
                          width: 36,
                          height: 36,
                          backgroundColor: '#fff',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 3,
                          marginLeft: 8,
                        }}>
                        <IMG
                          src={message?.mediaUrl}
                          style={{width: 30, height: 22}}
                        />
                      </Layer>
                      <RelativeLayout
                        style={{
                          borderRadius: 15,
                          width: '68%',
                          marginLeft: 4,
                        }}>
                        <Typography
                          style={{
                            lineHeight: 20,
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                          }}>
                          {message?.senderId === user?.id
                            ? chatToData?.secondUser?.fullName
                            : 'You'}
                        </Typography>
                        <Typography
                          style={{lineHeight: 20, fontSize: 14, color: '#000'}}>
                          Photo
                        </Typography>
                      </RelativeLayout>
                    </>
                  ) : (
                    <RelativeLayout
                      style={{
                        borderRadius: 15,
                        width: '82%',
                        marginLeft: 4,
                      }}>
                      <Typography
                        style={{
                          lineHeight: 20,
                          fontSize: 16,
                          fontWeight: '600',
                          color: '#000',
                        }}>
                        {message?.senderId === user?.id
                          ? 'You'
                          : chatToData?.firstUser?.fullName}
                      </Typography>
                      <Typography
                        style={{
                          lineHeight: 20,
                          fontSize: 14,
                          color: '#000',
                        }}>
                        {message?.text?.length > 35
                          ? message?.text?.substring(0, 35 - 3) + '...'
                          : message?.text}
                      </Typography>
                    </RelativeLayout>
                  )}

                  <Layer
                    style={{
                      // marginRight: 25,
                      marginBottom: 15,
                    }}>
                    <Pressable
                      onPress={() => {
                        setSelectable(false),
                          setSelected([]),
                          setIsReply(false);
                        setMessage(null);
                        setInputFocus(false);
                      }}>
                      <Element.CloseIcon />
                    </Pressable>
                  </Layer>
                </RelativeLayout>
                <Layer
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 16,
                    justifyContent: 'space-between',
                  }}>
                  <FormInput
                    placeholder="Type here"
                    name="text"
                    isFocus={inputFocus}
                    style={{width: '82%', fontSize: 17, paddingTop: 13}}
                    height="49"
                    multiline={true}
                    // defaultValue={selectedUpdateMessage?.[0]?.text}
                    {...register('text', {
                      required: galleryValues?.photo ? false : true,
                    })}
                    InputRightElement={
                      <Pressable onPress={uploadMedia}>
                        <NCameraIcon
                          style={{marginRight: 15}}
                          color="#65656D"
                        />
                      </Pressable>
                    }
                  />
                  <Button
                    style={{width: '14%'}}
                    isLoading={directMessageLoading || galleryUploadLoading}
                    onPress={handleSubmit(sendMessage)}
                    startIcon={<SendIcon2 color={'#fff'} />}
                  />
                </Layer>
              </>
            ) : (
              <>
                {galleryValues?.photo && (
                  <Layer
                    style={{
                      width: '92%',
                      backgroundColor: getColor({color: 'primary.100'}),
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderRadius: 8,
                      shadowOffset: {width: 0, height: 2},
                      shadowColor: 'rgb(0,0,0)',
                      shadowOpacity: 0.25,
                      shadowRadius: 5,
                      elevation: 10,
                      marginBottom: 10,
                    }}>
                    <Layer
                      style={{
                        marginBottom: 15,
                        alignSelf: 'flex-end',
                        padding: 10,
                      }}>
                      <Pressable onPress={() => cleanImage()}>
                        <Element.CloseIcon />
                      </Pressable>
                    </Layer>
                    <IMG
                      src={galleryValues?.photo}
                      style={{
                        width: '97%',
                        borderRadius: 15,
                        marginBottom: 15,
                        marginLeft: 5,
                      }}
                    />
                  </Layer>
                )}
                <Layer
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 6,
                    justifyContent: 'space-between',
                  }}>
                  <FormInput
                    placeholder="Type here"
                    name="text"
                    multiline={true}
                    isFocus={inputFocus ? true : false}
                    style={{width: '82%', fontSize: 17, paddingTop: 13}}
                    height="49"
                    {...register('text', {
                      required: galleryValues?.photo ? false : true,
                    })}
                    InputRightElement={
                      <Pressable onPress={uploadMedia}>
                        <NCameraIcon
                          style={{marginRight: 15}}
                          color="#65656D"
                        />
                      </Pressable>
                    }
                  />
                  <Button
                    style={{width: '14%'}}
                    isLoading={directMessageLoading || galleryUploadLoading}
                    onPress={handleSubmit(sendMessage)}
                    startIcon={<SendIcon2 color={'#fff'} />}
                  />
                </Layer>
              </>
            )}
          </FormProvider>
        </RelativeLayout>
      )}
    </>
  );
};

export default DirectMessage;

const styles = StyleSheet.create({});
