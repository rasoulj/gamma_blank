import {
  OTPublisher,
  OTPublisherProperties,
  OTSession,
  OTSessionEventHandlers,
  OTSubscriber,
  OTSubscriberEventHandlers,
  OTSubscriberProperties,
  OTSubscriberView,
} from 'opentok-react-native';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import LiveBottomOptions from './LiveBottomOptions';
import {useNavigate} from '~/components';
import useAuthStore from '~/stores/authStore';
import LiveTopOptions from './LiveTopOptions';
import {useQueryClient} from 'react-query';

const LiveMain = ({
  onSignalRecieved,
  messages,
  setMessages,
  user,
  entityId,
  item,
  hasBottomOptions = true,
}: {
  onSignalRecieved?: (value: string) => void;
  messages?: any[];
  setMessages?: (messages?: any[]) => void;
  user: any;
  entityId: number;
  item: any;
  hasBottomOptions?: boolean;
}) => {
  const currentUser = useAuthStore(state => state.user);
  const {sessionId, apiKey, token, setRefreshNumber} = useLiveStreamStore();

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
      cameraPosition: 'back',
    },
    videoSource: 'screen',
    subscriberProperties: {subscribeToVideo: false, subscribeToAudio: false},
  });

  const {navigation} = useNavigate();

  const bottomRef = useRef<any>();
  const [sessionProperty, setSessionProperties] = useState({
    videoTrack: true,
    audioTrack: false,
    publishVideo: false,
    publishAudio: false,
  });

  const sessionEventHandlers: OTSessionEventHandlers = {
    streamCreated: event => {
      setTimeout(() => {
        setSessionProperties({
          videoTrack: false,
          audioTrack: false,
          publishVideo: false,
          publishAudio: false,
        });
      }, 100);
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
    },
    sessionDisconnected: error => {
      setVideoCallState({
        ...VideoCallState,
        streamProperties: {},
        subscriberIds: [],
      });
    },
    signal: event => {
      if (event.data) {
        bottomRef?.current?.onNewMessage(event?.data);
      }
    },
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
    if (
      subscribers?.length !== undefined &&
      typeof subscribers?.length === 'number'
    ) {
      setSubscribeCount(subscribers.length);
    }

    return (
      <>
        {subscribers?.length > 0 && (
          <OTSubscriberView
            streamId={subscribers?.[0]}
            key={subscribers?.[0]}
            style={styles.subscriberView}
          />
        )}
      </>
    );
  };

  const queryClient = useQueryClient();
  const subscriberHandler: OTSubscriberEventHandlers = {
    disconnected: () => {
      setRefreshNumber();
      navigation.goBack();
      queryClient.invalidateQueries(['vonage_getAllSessions'], {
        exact: false,
      });
    },
    connected: () => {},
  };

  return (
    <>
      <LiveTopOptions
        user={user}
        numOfSubscribers={subscribeCount}
        hasClose={hasBottomOptions}
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
              properties={sessionProperty}
              style={[styles.publisher]}
            />
            <OTSubscriber
              style={styles.subscirber}
              eventHandlers={subscriberHandler}>
              {renderSubscribers}
            </OTSubscriber>
          </OTSession>
        </View>
      </View>
      {hasBottomOptions && (
        <LiveBottomOptions
          user={user}
          onSendMessage={onSendMessage}
          ref={bottomRef}
          item={item}
        />
      )}
    </>
  );
};

export default LiveMain;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  publisher: {
    position: 'absolute',
    width: 1,
    height: 1,
    zIndex: -999,
  },

  subscirber: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 999,
    left: 0,
    right: 0,
  },

  subscriberView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
    flex: 1,
  },
});
