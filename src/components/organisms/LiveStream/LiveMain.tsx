import {
  OTPublisher,
  OTSession,
  OTSubscriber,
  OTSubscriberView,
} from 'opentok-react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import * as credentials from 'vonageConfig';
import {ChatIcon, FilmDarkIcon} from '~/components/elemental';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import {scale} from '../../elemental';
import LiveStreamChat from './LiveStreamChat';
import LiveStreamFooter from './LiveStreamFooter';
import styles from './styles';

type LiveStreamProps = {
  apiKey: string;
  session: {
    id: string;
    token: string;
  };
};

const tabData = [
  {
    title: 'Session',
    icon: 'video',
  },
  {
    title: 'Chat',
    icon: 'forum',
  },
];

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const mainSubscribersResolution = {width: 1280, height: 720};
const secondarySubscribersResolution = {width: 352, height: 288};

const LiveMain = () => {
  const [subscribeCount, setSubscribeCount] = useState<number>(0);
  const [isShowSubscribers, setIsShowSubscribers] = useState<boolean>(false);
  const viewPager = useRef(null);
  const [page, setPage] = useState<number>(0);

  const {
    sessionId,
    apiKey,
    token,
    isCameraEnabled,
    isMicEnabled,
    setIsCameraEnabled,
    setIsMicEnabled,
  } = useLiveStreamStore();
  // console.log(apiKey, '\n', id, '\n', token);

  const [VideoCallState, setVideoCallState] = useState<{
    subscriberIds: string[];
    audioTrack: boolean;
    publishAudio: boolean;
    localPublishAudio: boolean;
    localPublishVideo: boolean;
    joinCall: boolean;
    streamProperties: object;
    mainSubscriberStreamId: string | null;
    publisherProperties: object;
    videoSource: string;
  }>({
    subscriberIds: [],
    audioTrack: true,
    publishAudio: true,
    localPublishAudio: true,
    localPublishVideo: true,
    joinCall: false,
    streamProperties: {},
    mainSubscriberStreamId: null,
    publisherProperties: {
      cameraPosition: 'front',
    },
    videoSource: 'screen',
  });

  useEffect(() => {
    joinCall();
  }, []);

  const joinCall = () => {
    if (!VideoCallState.joinCall) {
      setVideoCallState({
        ...VideoCallState,
        joinCall: true,
      });
    }
  };

  const endCall = () => {
    if (VideoCallState.joinCall) {
      setVideoCallState({
        ...VideoCallState,
        joinCall: false,
      });
    }
  };

  const subscribersTimer = async () => {
    setTimeout(() => {
      setIsShowSubscribers(false);
    }, 15000);
  };

  const sessionEventHandlers = {
    streamCreated: event => {
      console.log('streamCreated', event);
      const streamProperties = {
        ...VideoCallState.streamProperties,
        [event.streamId]: {
          subscribeToAudio: isMicEnabled,
          subscribeToVideo: isCameraEnabled,
        },
      };
      setVideoCallState({
        ...VideoCallState,
        streamProperties,
        subscriberIds: [...VideoCallState.subscriberIds, event.streamId],
      });
    },
    streamDestroyed: event => {
      console.log('streamDestroyed', event);

      const indexToRemove = VideoCallState.subscriberIds.indexOf(
        event.streamId,
      );
      const newSubscriberIds = VideoCallState.subscriberIds;
      const streamProperties = {...VideoCallState.streamProperties};
      if (indexToRemove !== -1) {
        delete streamProperties[event.streamId];
        newSubscriberIds.splice(indexToRemove, 1);
        setVideoCallState({
          ...VideoCallState,
          streamProperties,
          subscriberIds: newSubscriberIds,
        });
      }
    },
    error: error => {
      console.log('session error:', error);
    },
    otrnError: error => {
      console.log('Session otrnError error:', error);
    },
    sessionDisconnected: error => {
      console.log('streamDestroyed', error);

      setVideoCallState({
        ...VideoCallState,
        streamProperties: {},
        subscriberIds: [],
      });
    },
  };

  const publisherEventHandlers = {
    streamCreated: event => {
      console.log('Publisher stream created!', event);
    },
    streamDestroyed: event => {
      console.log('Publisher stream destroyed!', event);
    },
    audioLevel: event => {},
  };

  const subscriberEventHandlers = {
    connected: () => {
      console.log('[subscriberEventHandlers - connected]');
    },
    disconnected: () => {
      console.log('[subscriberEventHandlers - disconnected]');
    },
    error: error => {
      console.log('subscriberEventHandlers error:', error);
    },
  };

  const handleSubscriberSelection = (subscribers: any, streamId: any) => {
    let subscriberToSwap = subscribers.indexOf(streamId);
    let currentSubscribers = subscribers;
    let temp = currentSubscribers[subscriberToSwap];
    currentSubscribers[subscriberToSwap] = currentSubscribers[0];
    currentSubscribers[0] = temp;

    const newStreamProps = {...VideoCallState.streamProperties};

    for (let i = 0; i < currentSubscribers.length; i += 1) {
      if (i === 0) {
        newStreamProps[currentSubscribers[i]] = {
          ...VideoCallState.streamProperties[currentSubscribers[i]],
        };
        newStreamProps[currentSubscribers[i]].preferredResolution =
          mainSubscribersResolution;
      } else {
        newStreamProps[currentSubscribers[i]] = {
          ...VideoCallState.streamProperties[currentSubscribers[i]],
        };
        newStreamProps[currentSubscribers[i]].preferredResolution =
          secondarySubscribersResolution;
      }
    }

    setVideoCallState({
      ...VideoCallState,
      mainSubscriberStreamId: streamId,
      streamProperties: newStreamProps,
    });
  };

  const handleScrollEnd = (event: any, subscribers: any) => {
    let firstVisibleIndex;
    if (
      event &&
      event.nativeEvent &&
      !isNaN(event.nativeEvent.contentOffset.x)
    ) {
      firstVisibleIndex = parseInt(
        event.nativeEvent.contentOffset.x / (dimensions.width / 2),
        10,
      );
      console.log('firstVisibleIndex', firstVisibleIndex);
    }

    const newStreamProps = {...VideoCallState.streamProperties};
    if (firstVisibleIndex !== undefined && !isNaN(firstVisibleIndex)) {
      for (let i = 0; i < subscribers.length; i += 1) {
        if (i === firstVisibleIndex || i === firstVisibleIndex + 1) {
          newStreamProps[subscribers[i]] = {
            ...VideoCallState.streamProperties[subscribers[i]],
          };
          newStreamProps[subscribers[i]].subscribeToVideo = true;
        } else {
          newStreamProps[subscribers[i]] = {
            ...VideoCallState.streamProperties[subscribers[i]],
          };
          newStreamProps[subscribers[i]].subscribeToVideo = false;
        }
      }
    }

    console.log('streamProperties#2', newStreamProps);

    setVideoCallState({
      ...VideoCallState,
      streamProperties: newStreamProps,
    });
  };

  const renderSubscribers = (subscribers: any) => {
    console.log('subscribers', subscribers);

    if (VideoCallState.mainSubscriberStreamId) {
      subscribers = subscribers.filter(
        sub => sub !== VideoCallState.mainSubscriberStreamId,
      );
      subscribers.unshift(VideoCallState.mainSubscriberStreamId);
    }

    if (
      subscribers.length !== undefined &&
      typeof subscribers.length === 'number'
    ) {
      setSubscribeCount(subscribers.length);
    }

    return subscribers.length > 1 ? (
      <>
        <TouchableOpacity
          onPress={() => {
            setIsShowSubscribers(!isShowSubscribers);
            subscribersTimer();
          }}
          style={{
            width: '100%',
            height: '50%',
            borderRadius: scale(8),

            backgroundColor: 'transparent',
            position: 'absolute',
            zIndex: 99,
            marginTop: 50,

            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <OTSubscriberView
            streamId={subscribers[0]}
            style={{
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              flex: 1,
              width: '100%',
              height: '50%',
              borderRadius: scale(8),
            }}
          />
        </TouchableOpacity>

        {isShowSubscribers && (
          <View
            style={{
              position: 'absolute',
              zIndex: 100,
              bottom: 0,
              width: '100%',
              height: scale(130),
            }}>
            <ScrollView
              horizontal={true}
              decelerationRate={0}
              nestedScrollEnabled={true}
              snapToInterval={dimensions.width / 3}
              snapToAlignment={'center'}
              onScrollEndDrag={e => handleScrollEnd(e, subscribers.slice(1))}
              contentContainerStyle={{
                alignItems: 'center',
                backgroundColor: 'gray',
              }}
              style={{
                width: '100%',
                height: scale(130),
                backgroundColor: 'gray',
              }}>
              {subscribers.slice(1).map((streamId: any) => (
                <TouchableOpacity
                  onPress={() => {
                    handleSubscriberSelection(subscribers, streamId);
                    setIsShowSubscribers(false);
                  }}
                  style={{
                    width: scale(120),
                    height: scale(120),
                    borderRadius: scale(8),
                    overflow: 'hidden',
                  }}
                  key={streamId}>
                  <OTSubscriberView
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                    }}
                    key={streamId}
                    streamId={streamId}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </>
    ) : subscribers.length > 0 ? (
      <OTSubscriberView
        streamId={subscribers[0]}
        key={subscribers[0]}
        style={{
          width: '100%',
          height: '50%',
          position: 'absolute',
          bottom: 0,
          borderRadius: scale(8),
        }}
      />
    ) : null;
  };

  const toggleAudio = () => {
    let publishAudio = VideoCallState.localPublishAudio;
    setVideoCallState({
      ...VideoCallState,
      publisherProperties: {
        ...VideoCallState.publisherProperties,
        publishAudio: !publishAudio,
      },
      audioTrack: !VideoCallState?.audioTrack,
      publishAudio: !VideoCallState?.publishAudio,
      localPublishAudio: !publishAudio,
    });
    setIsMicEnabled(!VideoCallState?.audioTrack);
  };

  const toggleVideo = () => {
    let publishVideo = VideoCallState.localPublishVideo;
    setVideoCallState({
      ...VideoCallState,
      publisherProperties: {
        ...VideoCallState.publisherProperties,
        publishVideo: !publishVideo,
      },
      videoSource:
        VideoCallState?.videoSource === 'screen' ? 'camera' : 'screen',
      localPublishVideo: !publishVideo,
    });
    setIsCameraEnabled(!publishVideo);
  };

  const move = (currentPage: number) => {
    viewPager.current.setPage(currentPage);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        {/* {tabData.map((itm: any, indx: number) => {
          const isActive = indx === page;
          const backgroundColor = isActive ? '#C1F5E7' : 'transparent';
          return (
            <TouchableOpacity
              key={`itm${indx}`}
              activeOpacity={0.7}
              onPress={() => move(indx)}
              style={[
                styles.button,
                {
                  backgroundColor,
                  alignItems: 'center',
                  paddingVertical: scale(16),
                },
              ]}>
              {indx === 0 ? <FilmDarkIcon /> : <ChatIcon />}

              <Text
                style={[
                  {
                    color: '#52525B',
                    textAlign: 'center',
                    marginTop: 10,
                  },
                ]}>
                {itm.title}
              </Text>
            </TouchableOpacity>
          );
        })} */}
      </View>
      <View style={{flex: 1}}>
        <PagerView
          style={styles.pagerView}
          ref={viewPager}
          initialPage={page}
          scrollEnabled={true}
          onPageSelected={e => setPage(e.nativeEvent.position)}>
          {tabData.map((item: any, index: number) => {
            switch (item.title) {
              case 'Session':
                return (
                  <View
                    key={'tabSession'}
                    style={{
                      flex: 1,
                    }}>
                    <OTSession
                      apiKey={String(apiKey).trim()}
                      sessionId={String(sessionId).trim()}
                      token={String(token).trim()}
                      eventHandlers={sessionEventHandlers}
                      style={{
                        width: '100%',
                        height: '90%',
                        backgroundColor: '#2222',
                        borderRadius: 15,
                      }}
                      options={{}}>
                      <OTPublisher
                        properties={VideoCallState.publisherProperties}
                        eventHandlers={publisherEventHandlers}
                        style={[
                          styles.publisherStyle,
                          {
                            flex: 1,
                            position: 'absolute',
                            width: '100%',
                            height: subscribeCount > 0 ? '50%' : '90%',
                            zIndex: 999,
                            marginTop: 30,
                            backgroundColor: '#2222',
                            borderRadius: 15,
                          },
                        ]}
                      />
                      <OTSubscriber
                        style={{
                          flex: 1,
                          height: dimensions.height / 2,
                          width: dimensions.width,
                          backgroundColor: '#2222',
                          borderRadius: 15,
                        }}
                        eventHandlers={subscriberEventHandlers}
                        streamProperties={VideoCallState.streamProperties}>
                        {renderSubscribers}
                      </OTSubscriber>
                    </OTSession>
                  </View>
                );
              case 'Chat':
                return <LiveStreamChat key={'tabChat'} vonageSessionId={9} />;
              default:
                return;
            }
          })}
        </PagerView>
      </View>

      <LiveStreamFooter
        toggleAudio={toggleAudio}
        toggleVideo={toggleVideo}
        endCall={endCall}
      />
    </SafeAreaView>
  );
};

export default LiveMain;
