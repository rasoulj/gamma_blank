import {
  OTPublisher,
  OTPublisherProperties,
  OTSession,
  OTSessionEventHandlers,
  OTSubscriber,
  OTSubscriberEventHandlers,
  OTSubscriberProperties,
} from 'opentok-react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import LiveStreamFooter from './LiveStreamFooter';
import LiveBottomOptions from './LiveBottomOptions';
import {useNavigate, useRoute} from '~/components';
import useAuthStore from '~/stores/authStore';
import {
  useCreateNotificationMutation,
  useGetFollowersId,
  useUpdateVonageSessionMutation,
} from './hooks';
import LiveTopOptions from './LiveTopOptions';
import {useQueryClient} from 'react-query';

const LivePublisher = () => {
  const entityId = useRoute()?.params?.entityId;
  const cameraPosition = useRoute()?.params?.cameraPosition;
  const currentUser = useAuthStore(state => state.user);
  const {
    sessionId,
    apiKey,
    token,
    isCameraEnabled,
    isMicEnabled,
    setIsCameraEnabled,
    setIsMicEnabled,
  } = useLiveStreamStore();

  const [VideoCallState, setVideoCallState] = useState<{
    subscriberIds: string[];
    audioTrack: boolean;
    publishAudio: boolean;
    localPublishAudio: boolean;
    localPublishVideo: boolean;
    joinCall: boolean;
    streamProperties: object;
    mainSubscriberStreamId: string | null;
    publisherProperties: OTPublisherProperties;
    subscriberProperties: OTSubscriberProperties;
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
      cameraPosition: cameraPosition ?? 'back',
      publishAudio: true,
      publishVideo: true,
    },
    videoSource: 'screen',
    subscriberProperties: {subscribeToVideo: true, subscribeToAudio: true},
  });

  const endCall = () => {
    if (VideoCallState.joinCall) {
      setVideoCallState({
        ...VideoCallState,
        joinCall: false,
      });
    }
  };

  const {navigation} = useNavigate();
  const {mutate: updateSessionMutate} = useUpdateVonageSessionMutation();
  const {mutate} = useCreateNotificationMutation();

  const queryClient = useQueryClient();

  const {
    data: followerData,
    hasNextPage,
    fetchNextPage,
  } = useGetFollowersId({userId: currentUser?.id});

  const followersId = useMemo(() => {
    if (hasNextPage) fetchNextPage();
    else {
      return followerData?.pages?.map((item, index) => {
        return {userId: item?.user?.id, notificationType: 'END_LIVE'};
      });
    }
  }, [followerData]);
  const onCreateLiveNotif = () => {
    mutate(
      {input: followersId},
      {
        onSuccess() {
          navigation.goBack();
        },
      },
    );
  };

  const onSessionEnded = () => {
    updateSessionMutate(
      {input: {id: entityId, isFinished: true, sessionType: 'LIVE'}},
      {
        onSuccess(data) {
          if (data?.vonage_updateSession?.status?.code === 1) {
            queryClient.invalidateQueries(['vonage_getAllSessions'], {
              exact: false,
            });
            onCreateLiveNotif();
          }
        },
      },
    );
  };
  const liveInterVal = useRef<any>();
  useEffect(() => {
    return () => clearInterval(liveInterVal.current);
  }, []);

  const updateCallStatus = () => {
    liveInterVal.current = setInterval(() => {
      updateSessionMutate(
        {
          input: {id: entityId, isFinished: false, sessionType: 'LIVE'},
        },
        {
          onSuccess: data => {},
        },
      );
    }, 1 * 60 * 1000);
  };

  const bottomRef = useRef<any>();
  const sessionEventHandlers: OTSessionEventHandlers = {
    streamCreated: event => {
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
      onSessionEnded();
    },
    error: error => {},
    otrnError: error => {},
    sessionDisconnected: error => {
      setVideoCallState({
        ...VideoCallState,
        streamProperties: {},
        subscriberIds: [],
      });
      onSessionEnded();
    },
    signal: event => {
      if (event.data) {
        bottomRef?.current?.onNewMessage(event?.data);
      }
    },
  };

  const publisherEventHandlers = {
    streamCreated: event => {
      updateCallStatus();
    },
    streamDestroyed: event => {
      onSessionEnded();
    },
    audioLevel: event => {},
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

  const onFlipCamera = () => {
    let cameraPosition = VideoCallState.publisherProperties.cameraPosition;
    setVideoCallState({
      ...VideoCallState,
      publisherProperties: {
        ...VideoCallState.publisherProperties,
        cameraPosition: cameraPosition === 'back' ? 'front' : 'back',
      },
      audioTrack: !VideoCallState?.audioTrack,
      publishAudio: !VideoCallState?.publishAudio,
    });
  };
  const [signalText, setSignalText] = useState<any>();
  const prevMsg = useRef<any>();
  const onSendMessage = (
    message: string,
    type?: 'TEXT' | 'LIKE' | 'JOINED' | 'LEFT',
  ) => {
    let messageObject =
      type === 'LIKE'
        ? {
            user: {
              fullName: currentUser?.fullName,
              photoUrl: currentUser?.photoUrl,
            },
            type,
            message,
          }
        : {
            message,
            user: {
              fullName: currentUser?.fullName,
              photoUrl: currentUser?.photoUrl,
            },
            rand: `${Math.random()}`,
          };
    prevMsg.current = JSON.stringify(messageObject);
    if (message?.length > 0)
      setSignalText({data: JSON.stringify(messageObject)});
  };

  const [subscribeCount, setSubscribeCount] = useState(0);
  const renderSubscribers = (subscribers: any) => {
    if (Array.isArray(subscribers)) {
      setSubscribeCount(subscribers?.length);
    }
    return <></>;
  };
  const subscriberHandler: OTSubscriberEventHandlers = {
    disconnected: () => {},
    connected: () => {},
  };

  return (
    <View style={styles.container}>
      <LiveTopOptions
        user={currentUser}
        numOfSubscribers={subscribeCount}
        footer={
          <LiveStreamFooter
            toggleAudio={toggleAudio}
            toggleVideo={toggleVideo}
            endCall={endCall}
            onFlipCamera={onFlipCamera}
          />
        }
      />
      <View style={styles.flex1}>
        <View style={styles.flex1}>
          <OTSession
            apiKey={String(apiKey).trim()}
            sessionId={String(sessionId).trim()}
            token={String(token).trim()}
            eventHandlers={sessionEventHandlers}
            signal={signalText}
            style={styles.flex1}>
            <OTPublisher
              properties={{
                ...VideoCallState.publisherProperties,
              }}
              eventHandlers={publisherEventHandlers}
              style={styles.publisher}
            />
            <OTSubscriber
              style={styles.publisher}
              eventHandlers={subscriberHandler}>
              {renderSubscribers}
            </OTSubscriber>
          </OTSession>
        </View>
      </View>
      <LiveBottomOptions
        user={currentUser}
        onSendMessage={onSendMessage}
        ref={bottomRef}
        sessionId={sessionId}
        item={{undefined}}
      />
    </View>
  );
};

export default LivePublisher;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},

  flex1: {flex: 1},

  publisher: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
    borderRadius: 15,
  },
});
