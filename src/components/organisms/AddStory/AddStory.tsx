import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AppState,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import Reanimated from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
import {
  Screen,
  useRoute,
  useNavigate,
  Typography,
  getColor,
} from '~/components/elemental';
import TakePhotoTopOptions from './TakePhotoTopOptions';
import TakePhotoBottomOptions from './TakePhotoBottomOptions';
import {TextInput} from 'react-native';
import AddLiveBottomOptions from './AddLiveBottomOptions';
import useLiveStreamStore from '~/stores/LiveStreamStore';
import {
  useCreateVonageUserMutation,
  useGetFollowersId,
  useVonageCreateSession,
  useVonageCreateSessionToken,
} from './hooks';
import useAuthStore from '~/stores/authStore';
import {model} from '~/data/model';

export const MAX_VIDEO_STORY_DURATION =
  model?.metaData?.configs?.socialStory?.duration ?? 20;

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

const storyConfigs = model?.metaData?.configs?.socialStory ?? {
  uploadPhoto: true,
  uploadVideo: true,
  uploadFromGallery: true,
  uploadFromCamera: true,
};
const reelsConfigs = model?.metaData?.configs?.socialReels ?? {
  uploadPhoto: true,
  uploadVideo: true,
  uploadFromGallery: true,
  uploadFromCamera: true,
};
const postConfigs = model?.metaData?.configs?.socialPost ?? {
  uploadPhoto: true,
  uploadVideo: true,
  uploadFromGallery: true,
  uploadFromCamera: true,
};
const socialConfigs = model?.metaData?.configs?.social ?? {
  post: true,
  reels: true,
  live: true,
  story: true,
};

interface IAddStoryProp {
  type?: 'Story' | 'Post' | 'Reels' | 'Live';
}

export default function AddStory({type}: IAddStoryProp) {
  const camera = useRef<Camera>(null);
  const route = useRoute();
  const [currentItem, setCurrentItem] = useState<
    'Story' | 'Post' | 'Reels' | 'Live'
  >(route?.params?.type ?? type ?? 'Story');

  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [isDenied, setIsDenied] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );
  const [flash, setFlash] = useState<'off' | 'on'>('off');
  const device = useCameraDevice(cameraPosition, {
    physicalDevices: ['wide-angle-camera'],
  });
  const supportsFlash = device?.hasFlash ?? false;
  const supportsCameraFlipping = true;

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();
    if (permission === 'denied') {
      setIsDenied(true);
    } else if (permission === 'granted') {
      setIsDenied(false);
    }
  }, []);
  const requestMicrophonePermission = useCallback(async () => {
    const permission = await Camera.requestMicrophonePermission();
    if (permission === 'denied') {
      await Linking.openSettings();
    }
    setHasMicrophonePermission(permission === 'granted');
  }, []);
  const checkPermission = async () => {
    await Camera.getMicrophonePermissionStatus().then(async status => {
      if (status != 'granted') {
        await requestMicrophonePermission();
      }
      setHasMicrophonePermission(status === 'granted');
    });
    await Camera.getCameraPermissionStatus().then(async status => {
      if (status != 'granted') {
        await requestCameraPermission();
      } else {
        setIsDenied(false);
      }
    });
  };
  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (route?.params?.type) setCurrentItem(route?.params?.type);
    else {
      setCurrentItem(
        socialConfigs?.post
          ? 'Post'
          : socialConfigs?.reels
          ? 'Reels'
          : socialConfigs?.live
          ? 'Live'
          : 'Story',
      );
    }
  }, [route]);

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
  }, []);
  const onFlashPressed = useCallback(() => {
    setFlash(f => (f === 'off' ? 'on' : 'off'));
  }, []);

  const onInitialized = useCallback(() => {}, []);

  const isScreenFocused = useIsFocused();
  const [isOnForeground, setIsOnForeground] = useState(true);
  const [isPhotoStory, setIsPhotoStory] = useState(true);
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        setIsOnForeground(true);
      } else {
        setIsOnForeground(false);
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);
  const {navigateWithName} = useNavigate();
  const onTakePhoto = (path: string, mime?: string, isCompressed?: boolean) => {
    if (currentItem === 'Reels')
      navigateWithName('AddReel', {
        createType: 'reels',
        media: path?.indexOf('file:/') === 0 ? path : `file://${path}`,
        type: 'VIDEO',
      });
    else if (currentItem === 'Post') {
      navigateWithName('create Post', {
        photos: [
          {
            uri: path?.indexOf('file:/') === 0 ? path : `file://${path}`,
            type: mime && mime?.indexOf('image') === -1 ? 'VIDEO' : 'IMAGE',
            isCompressed,
          },
        ],
      });
    } else
      navigateWithName('PreviewAddedStory', {
        media: path,
        type: mime && mime?.indexOf('image') === -1 ? 'VIDEO' : 'IMAGE',
        isCompressed,
      });
  };
  const onRecordVideo = (videoFile?: any) => {
    setRecordingStartTime(undefined);
    setRecordingEndTime(undefined);
    setIsPhotoStory(prev => !prev);
    if (videoFile) {
      if (currentItem === 'Reels')
        navigateWithName('AddReel', {
          createType: 'reels',
          media:
            videoFile?.path?.indexOf('file:/') === 0
              ? videoFile?.path
              : `file://${videoFile?.path}`,
          type: 'VIDEO',
        });
      else if (currentItem === 'Post') {
        navigateWithName('Preview Post', {
          photos: [
            {
              uri:
                videoFile?.path?.indexOf('file:/') === 0
                  ? videoFile?.path
                  : `file://${videoFile?.path}`,
              type: 'VIDEO',
            },
          ],
        });
      } else
        navigateWithName('PreviewAddedStory', {
          media: videoFile?.path,
          type: 'VIDEO',
        });
    }
  };

  const timeRef = useRef<TextInput>();
  const [endRecordingReached, setEndRecordingReached] =
    useState<boolean>(false);
  const [recordingStartTime, setRecordingStartTime] = useState<
    Date | undefined
  >();
  const [recordingEndTime, setRecordingEndTime] = useState<Date | undefined>();
  useEffect(() => {
    setRecordingStartTime(undefined);
    setRecordingEndTime(undefined);
  }, [isScreenFocused]);
  const stopRecording = async () => {
    setRecordingEndTime(new Date());
    await camera.current?.stopRecording();
  };
  useEffect(() => {
    try {
      if (endRecordingReached) {
        stopRecording();
      }
    } catch (error) {}
  }, [endRecordingReached]);
  const screenAspectRatio = 16 / 9;
  const format = useCameraFormat(device, [
    {fps: 30},
    {videoAspectRatio: screenAspectRatio},
    {videoResolution: {width: 480, height: 640}},
    {photoAspectRatio: screenAspectRatio},
    {photoResolution: 'max'},
  ]);

  const user = useAuthStore(state => state.user);
  const {
    data: followerData,
    hasNextPage,
    fetchNextPage,
  } = useGetFollowersId({userId: user?.id, where: {isFollower: {eq: true}}});

  const followersId = useMemo(() => {
    if (hasNextPage) fetchNextPage();
    else {
      return followerData?.pages?.map((item, index) => {
        return {userId: item?.user?.id, notificationType: 'START_LIVE'};
      });
    }
  }, [followerData]);

  const {setStatus, setSessionId, setApiKey, setToken} = useLiveStreamStore();
  const [counter, setCounter] = useState(3);
  const [isLiveStarting, setIsLiveStarting] = useState(false);
  const intervalRef = useRef<any>();

  const sessionId = useRef<number>(0);
  const {mutate: createUserMutate, isLoading: createUserLoading} =
    useCreateVonageUserMutation();
  const {mutate: tokenMutate, isLoading: tokenLoading} =
    useVonageCreateSessionToken();
  const {mutate: createMutate, isLoading: createLoading} =
    useVonageCreateSession();

  const onLiveStarted = () => {
    intervalRef.current = setInterval(() => {
      setCounter(prev => prev - 1);
    }, 1000);
  };

  const onStartLivePress = () => {
    const date = new Date(new Date().setDate(new Date().getDate() + 1));
    const input = {
      date: `${date.toISOString()}`,
      sessionType: 'LIVE',
    };
    createMutate(
      {input: input},
      {
        onSuccess(data: any) {
          if (data?.vonage_createSession?.status?.value === 'Success') {
            setSessionId(data?.vonage_createSession?.result?.sessionId);
            sessionId.current = data?.vonage_createSession?.result?.id;
            createUserMutate(
              {
                input: followersId?.map(item => {
                  return {
                    vonageSessionId: sessionId?.current,
                    userId: item?.userId,
                  };
                }),
              },
              {
                onSuccess: data => {
                  if (data?.vonage_createSessionUser?.status?.code === 1) {
                    tokenMutate(
                      {
                        vonageSessionId: sessionId.current,
                      },
                      {
                        onSuccess(data: any, variables, context) {
                          if (
                            data?.vonage_createTokenForSession?.status
                              ?.value === 'Success'
                          ) {
                            setApiKey(
                              data?.vonage_createTokenForSession?.result
                                ?.apiKey,
                            );
                            setToken(
                              data?.vonage_createTokenForSession?.result?.token,
                            );
                            setStatus('main');
                            setIsLiveStarting(true);
                            onLiveStarted();
                          }
                        },
                      },
                    );
                  }
                },
              },
            );
          }
        },
      },
    );
  };

  const onStartLive = () => {
    if (counter < 1) clearInterval(intervalRef.current);
    if (counter === 0) {
      setIsLiveStarting(false);
      setCounter(3);
      navigateWithName('Live', {
        entityId: sessionId.current,
        cameraPosition,
        type: 'publisher',
      });
    }
  };
  useEffect(() => {
    onStartLive();
  }, [counter]);
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const {uploadFromCamera, uploadFromGallery, uploadPhoto, uploadVideo} =
    useMemo(() => {
      if (currentItem === 'Story') {
        return {
          uploadFromCamera: storyConfigs?.uploadFromCamera ?? false,
          uploadFromGallery: storyConfigs?.uploadFromGallery ?? false,
          uploadPhoto: storyConfigs?.uploadPhoto ?? false,
          uploadVideo: storyConfigs?.uploadVideo ?? false,
        };
      } else if (currentItem === 'Reels') {
        return {
          uploadFromCamera: reelsConfigs?.uploadFromCamera ?? false,
          uploadFromGallery: reelsConfigs?.uploadFromGallery ?? false,
          uploadPhoto: false,
          uploadVideo: true,
        };
      } else if (currentItem === 'Post') {
        return {
          uploadFromCamera: postConfigs?.uploadFromCamera ?? false,
          uploadFromGallery: postConfigs?.uploadFromGallery ?? false,
          uploadPhoto: storyConfigs?.uploadPhoto,
          uploadVideo: storyConfigs?.uploadVideo,
        };
      } else {
        return {
          uploadFromCamera: true,
          uploadFromGallery: false,
          uploadPhoto: false,
          uploadVideo: true,
        };
      }
    }, [currentItem]);

  return (
    <>
      <Screen style={styles.container}>
        <TakePhotoTopOptions
          {...{
            isPhotoStory,
            setCurrentItem,
            currentItem,
            setEndRecordingReached,
            recordingEndTime,
            recordingStartTime,
            inputRef: timeRef,
          }}
        />
        {device != null && isOnForeground && uploadFromCamera && (
          <ReanimatedCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isScreenFocused}
            onInitialized={onInitialized}
            enableZoomGesture={true}
            photo={currentItem != 'Reels' && isPhotoStory}
            video={currentItem === 'Reels' || !isPhotoStory}
            key={device.id}
            audio={hasMicrophonePermission}
            format={format}
          />
        )}
        {currentItem === 'Live' ? (
          <AddLiveBottomOptions onStartPress={onStartLivePress} />
        ) : (
          <TakePhotoBottomOptions
            {...{
              camera,
              flash,
              onFlipCameraPressed,
              supportsCameraFlipping,
              isDenied,
              onFlashPressed,
              supportsFlash,
              onTakePhoto,
              onRecordVideo,
              currentItem,
              setRecordingEndTime,
              setRecordingStartTime,
              timeRef,
              uploadFromCamera,
              uploadFromGallery,
              uploadPhoto,
              uploadVideo,
            }}
          />
        )}

        {(isLiveStarting ||
          tokenLoading ||
          createLoading ||
          createUserLoading) && (
          <View style={styles.liveCounter}>
            {isLiveStarting ? (
              <>
                <Typography color="gray.50" fontSize="4xl" fontWeight="700">
                  {counter}
                </Typography>
                <Typography color="gray.50" fontSize="3xl" fontWeight="400">
                  Starting Live
                </Typography>
              </>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  liveCounter: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 1000,
    opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: getColor({color: 'gray.800'}),
  },
});
