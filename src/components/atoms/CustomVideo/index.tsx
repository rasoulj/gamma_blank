import React, {
  useState,
  useRef,
  useEffect,
  memo,
  useMemo,
  useImperativeHandle,
} from 'react';
import {AppState, Platform, StyleSheet, ViewStyle} from 'react-native';
import {Flex} from 'native-base';
import Video, {OnLoadData} from 'react-native-video';
import {useIsFocused} from '@react-navigation/native';
import LoadIndicator from '../LoadIndicator';
import convertToProxyURL from 'react-native-video-cache';
import {getColor} from '~/components/elemental';

const bufferConfig = {
  minBufferMs: 100,
  maxBufferMs: 200,
  bufferForPlaybackMs: 100,
  bufferForPlaybackAfterRebufferMs: 100,
};

type propTypes = {
  source?: any;
  style?: ViewStyle;
  onEnd?: any;
  paused?: boolean;
  onError?: any;
  poster?: any;
  initVideoPosition?: number;
  isMute?: boolean;
  disableController?: boolean;
  longVideo?: boolean;
  isFullScreen?: boolean;
  onPauseAll?: any;
  onLoadEnd?: any;
  repeat?: boolean;
  enableCache?: boolean;
  videoStyle?: ViewStyle;
};

const CustomVideo = React.forwardRef(
  (
    {
      source,
      style,
      onEnd,
      paused = false,
      onError,
      poster,
      initVideoPosition = 0,
      isMute = false,
      disableController = true,
      longVideo = false,
      isFullScreen = false,
      onPauseAll,
      onLoadEnd,
      repeat = false,
      enableCache = false,
      videoStyle,
      ...rest
    }: propTypes,
    ref,
  ) => {
    const fullVideoPath = useMemo(
      () => ({
        uri: source
          ? enableCache && Platform.OS === 'android'
            ? convertToProxyURL(source)
            : source
          : '',
      }),
      [source],
    );

    const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
    const [errorInCache, setErrorInCache] = useState<boolean>(false);
    const [duration, setDuration] = useState(0);
    const [play, setPlay] = useState<boolean>(!paused);
    const inlineVideoRef = useRef<Video>(null);
    const inlineVideoPositionRef = useRef(0);

    useEffect(() => {
      setPlay(!paused);
    }, [paused]);

    useImperativeHandle(ref, () => ({
      play: () => {
        setPlay(true);
      },
      pause: () => {
        setPlay(false);
      },
    }));

    const onLoadData = (data: OnLoadData) => {
      onLoadEnd?.(data);
      const {duration: durationData} = data;
      setDuration(durationData);
      setVideoLoaded(true);
      if (initVideoPosition > 0) {
        inlineVideoRef.current?.seek(initVideoPosition, 5);
      }
    };

    const onEndTriggered = () => {
      if (longVideo) {
        setPlay(false);
      } else if (!repeat) {
        inlineVideoRef.current?.seek(0);
      }
      inlineVideoPositionRef.current = 0;
      onEnd?.();
    };

    const onHandleError = error => {
      if (!errorInCache) {
        setErrorInCache(true);
      } else {
        onError?.();
      }
    };
    const isFocused = useIsFocused();

    const playStatus = useRef(play);
    const appState = useRef(AppState.currentState);
    useEffect(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          setPlay(playStatus.current);
        } else {
          playStatus.current = play;
          setPlay(false);
        }
        appState.current = nextAppState;
      });
      return () => {
        subscription.remove();
      };
    }, []);

    return (
      <Flex
        style={[style]}
        backgroundColor={getColor({color: 'gray.80'})}
        flex={1}>
        {!videoLoaded && <LoadIndicator />}
        <Video
          ref={inlineVideoRef}
          source={fullVideoPath}
          style={[styles.video, videoStyle]}
          resizeMode={isFullScreen ? 'contain' : 'cover'}
          onLoad={onLoadData}
          controls={!disableController}
          onEnd={onEndTriggered}
          volume={1}
          muted={isMute}
          repeat={repeat}
          paused={!play || !isFocused}
          posterResizeMode="cover"
          onError={onHandleError}
          poster={poster}
          fullscreen={isFullScreen}
          bufferConfig={bufferConfig}
          {...rest}
        />
      </Flex>
    );
  },
);

export default memo(CustomVideo);

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  playIcon: {
    position: 'absolute',
    margin: 20,
    zIndex: 10,
    width: 32,
    height: 32,
  },
  posterContainer: {zIndex: 1, position: 'absolute'},
});
